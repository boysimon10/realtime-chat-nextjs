"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import NewChat from "./NewChat";
import {
    Card,
    CardHeader,
} from "@/components/ui/card";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Typage des membres
interface Member {
    _id: string;
    username: string;
}

// Typage des chats
interface Chat {
    _id: string;
    members: Member[];
}

const defaultAvatarUrl = '/upload/pp/default.png';

export default function ChatList() {
    const [chats, setChats] = useState<Chat[]>([]);
    const [currentUser, setCurrentUser] = useState<string | null>(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await fetch('/api/users/me');
                if (response.ok) {
                    const data = await response.json();
                    setCurrentUser(data._id);
                } else {
                    console.error("Failed to fetch current user");
                }
            } catch (error) {
                console.error("An error occurred while fetching current user", error);
            }
        };

        const fetchChats = async () => {
            try {
                const response = await fetch('/api/users/me/chats');
                if (response.ok) {
                    const data = await response.json();
                    setChats(data);
                } else {
                    console.error("Failed to fetch chats");
                }
            } catch (error) {
                console.error("An error occurred while fetching chats", error);
            }
        };

        fetchCurrentUser();
        fetchChats();
    }, []);

    return (
        <Card className="w-auto">
            <CardHeader>
                <NewChat />
                <Command>
                    <CommandInput placeholder="Chercher une personne" />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Chats">
                            {chats.map((chat) => {
                                const otherMembers = chat.members.filter(member => member._id !== currentUser);
                                return (
                                    <Link key={chat._id} href={`/chats/${chat._id}`}>
                                        <CommandItem className="cursor-pointer">
                                            <Avatar className="mr-2">
                                                <AvatarImage src={defaultAvatarUrl} alt="Avatar par défaut" className="mr-2" />
                                            </Avatar>
                                            <span>{otherMembers.map((member) => member.username).join(', ')}</span>
                                        </CommandItem>
                                    </Link>
                                );
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </CardHeader>
        </Card>
    );
}
