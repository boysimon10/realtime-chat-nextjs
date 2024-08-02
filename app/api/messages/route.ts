import { NextRequest, NextResponse } from 'next/server';
import Chat from '@/models/chat.model';
import Message from '@/models/message.model';
import User from '@/models/user.model';
import { connectToDB } from '@/db/db';

export const POST = async (req: NextRequest) => {
    try {
    await connectToDB();

    const body = await req.json();

    const { chatId, currentUserId, text, photo } = body;

    const currentUser = await User.findById(currentUserId);
    if (!currentUser) {
        return new NextResponse('User not found', { status: 404 });
    }

    const newMessage = await Message.create({
        chat: chatId,
        sender: currentUser,
        text,
        photo,
        seenBy: [currentUserId],
    });

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
        $push: { messages: newMessage._id },
        $set: { lastMessageAt: newMessage.createdAt },
      },
      { new: true }
    )
      .populate({
        path: 'messages',
        model: Message,
        populate: { path: 'sender seenBy', model: 'User' },
      })
      .populate({
        path: 'members',
        model: 'User',
      })
      .exec();

    return new NextResponse(JSON.stringify(newMessage), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse('Failed to create new message', { status: 500 });
  }
};
