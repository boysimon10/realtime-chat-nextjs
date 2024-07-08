import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MailPlus } from 'lucide-react';

interface User {
    _id: string;
    username: string;
}

const defaultAvatarUrl = '/upload/pp/default.png';

export default function NewChat() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch('/api/users');
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data: User[] = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        }

        fetchUsers();
    }, []);

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" size="icon"><MailPlus /></Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>New Chat</DialogTitle>
                        <DialogDescription>
                            Start a new chat
                        </DialogDescription>
                    </DialogHeader>
                    <Command>
                        <CommandInput placeholder="Chercher une personne" />
                        <CommandList>
                            {users.length === 0 ? (
                                <CommandEmpty>No results found.</CommandEmpty>
                            ) : (
                                <CommandGroup heading="Chats">
                                    {users.map(user => (
                                        <CommandItem key={user._id}>
                                            <Avatar className="mr-2">
                                                <AvatarImage src={defaultAvatarUrl} alt="Default Avatar" className="mr-2" />
                                            </Avatar>
                                            <span>{user.username}</span>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            )}
                        </CommandList>
                    </Command>
                </DialogContent>
            </Dialog>
        </>
    );
}
