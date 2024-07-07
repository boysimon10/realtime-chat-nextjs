import { NextRequest, NextResponse } from "next/server";
import Chat, { ChatDocument } from "../../../models/chat.model";
import User from "../../../models/user.model"; 
import { connectToDB } from "../../../db/db";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();

    const { members, messages, createdAt, lastMessageAt } = await req.json();

    if (!members || members.length !== 2) {
      return NextResponse.json({ error: "Exactly two members are required for a direct chat" }, { status: 400 });
    }

    // Créer un nouveau chat
    const newChat: ChatDocument = new Chat({
      members,
      messages: messages || [],
      createdAt: createdAt || Date.now(),
      lastMessageAt: lastMessageAt || Date.now(),
    });

    await newChat.save();

    // Mettre à jour les membres pour inclure le nouveau chat
    const updateAllMembers = members.map(async (memberId: string) => {
      await User.findByIdAndUpdate(
        memberId,
        {
          $addToSet: { chats: newChat._id },
        },
        { new: true }
      );
    });
    await Promise.all(updateAllMembers);

    return NextResponse.json({ message: "Chat created successfully", chat: newChat }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
