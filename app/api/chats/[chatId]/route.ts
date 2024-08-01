import { NextRequest, NextResponse } from "next/server";
import Chat from "@/models/chat.model";
import Message from "@/models/message.model";
import User from "@/models/user.model"; 
import { connectToDB } from "@/db/db";


export const GET = async (req: NextRequest, { params }: { params: { chatId: string } }) => {
    try {
      await connectToDB();
  
      const { chatId } = params;
  
      const chat = await Chat.findById(chatId)
        .populate({
          path: "members",
          model: User,
        })
        .populate({
          path: "messages",
          model: Message,
          populate: {
            path: "sender seenBy",
            model: User,
          },
        })
        .exec();
  
      return new NextResponse(JSON.stringify(chat), { status: 200 });
    } catch (err) {
      console.log(err);
      return new NextResponse("Failed to get chat details", { status: 500 });
    }
  };
  
  export const POST = async (req: NextRequest, { params }: { params: { chatId: string } }) => {
    try {
      await connectToDB();
  
      const { chatId } = params;
  
      const body = await req.json();
  
      const { currentUserId } = body;
  
      await Message.updateMany(
        { chat: chatId },
        { $addToSet: { seenBy: currentUserId } },
        { new: true }
      )
        .populate({
          path: "sender seenBy",
          model: User,
        })
        .exec();
  
      return new NextResponse("Seen all messages by current user", { status: 200 });
    } catch (err) {
      console.log(err);
      return new NextResponse("Failed to update seen messages", { status: 500 });
    }
  };