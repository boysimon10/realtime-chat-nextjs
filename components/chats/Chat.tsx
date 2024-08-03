"use client";
import ChatBox from './ChatBox';
import ChatBar from './ChatBar';
import ChatList from './ChatList';
import MessageBox from './MessageBox'

import {Card}  from "@/components/ui/card";



export default function Chat() {
    return (
        <>
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