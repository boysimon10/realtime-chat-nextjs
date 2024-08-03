"use client"
import Navbar from "../../../../components/navbar/Navbar.tsx"
import Chat from "../../../../components/chats/Chat.tsx"
//import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import {Card}  from "@/components/ui/card";
import ChatBox from '@/components/chats/ChatBox';
import ChatBar from '@/components/chats/ChatBar';
import ChatList from '@/components/chats/ChatList';
import MessageBox from '@/components/chats/MessageBox'

export default function ChatId() {

    return (
    <>
    <Navbar/>
    <main className="flex justify-center items-stretch p">
            <ChatList />
            <div className="">
                <Card className="w-auto">
                    <ChatBar />
                    <ChatBox />
                    <MessageBox />
                </Card>
            </div>
        </main>
    </>
    );
}