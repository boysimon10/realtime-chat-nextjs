import { getDataFromToken } from '@/helpers/getDataFromToken';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/user.model';
import Message from '@/models/message.model';
import Chat from "@/models/chat.model";
import { connectToDB } from '@/db/db';

connectToDB();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        
        const user = await User.findOne({ _id: userId }).select("-password");

        
    const allChats = await Chat.find({ members: userId })
    .sort({ lastMessageAt: -1 })
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

        return NextResponse.json(allChats);
    } catch (error: any) {
        // Return an error response with status 400
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
