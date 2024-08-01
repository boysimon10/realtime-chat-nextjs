import { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MailPlus } from 'lucide-react';
import { useRouter } from "next/navigation"

interface User {
    _id: string;
    username: string;
}

const defaultAvatarUrl = '/upload/pp/default.png';

export default function NewChat() {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<string | undefined>(undefined);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            try {
                const [currentUserResponse, usersResponse] = await Promise.all([
                    fetch('/api/users/me'),
                    fetch('/api/users'),
                ]);

                if (!currentUserResponse.ok) {
                    throw new Error('Échec du chargement de l\'utilisateur actuel');
                }
                if (!usersResponse.ok) {
                    throw new Error('Échec du chargement des utilisateurs');
                }

                const currentUserData: User = await currentUserResponse.json();
                const usersData: User[] = await usersResponse.json();

                setCurrentUser(currentUserData);
                setUsers(usersData);
            } catch (error) {
                console.error('Échec du chargement des données :', error);
            }
        }

        fetchData();
    }, []);

    const handleUserSelect = (userId: string) => {
        setSelectedUser(userId);
    };

    const handleCreateChat = async () => {
        if (!selectedUser || !currentUser) return;

        try {
            const response = await fetch('/api/chats', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    members: [currentUser._id, selectedUser],
                    messages: [],
                }),
            });

            if (!response.ok) {
                throw new Error('Échec de la création du chat');
            }

            const data = await response.json();
            const chatId = data.chat._id;
            router.push(`/chats/${chatId}`);
            console.log('Chat créé avec succès :', data);
            // Gérer la création réussie du chat (par exemple, naviguer vers le chat, afficher un message de succès, etc.)
        } catch (error) {
            console.error('Échec de la création du chat :', error);
        }
    };

    const filteredUsers = users.filter(user => user._id !== currentUser?._id);

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" size="icon"><MailPlus /></Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Nouveau Chat</DialogTitle>
                        <DialogDescription>
                            Commencer un nouveau chat
                        </DialogDescription>
                    </DialogHeader>
                    <Command>
                        
                        <CommandList>
                            {filteredUsers.length === 0 ? (
                                <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
                            ) : (
                                <CommandGroup heading="Chats">
                                    <RadioGroup 
                                        value={selectedUser} 
                                        onValueChange={handleUserSelect}
                                    >
                                        {filteredUsers.map(user => (
                                            <div className="flex items-center space-x-2" key={user._id}>
                                                <RadioGroupItem value={user._id} id={user._id} />
                                                <Label htmlFor={user._id} className='flex items-center'>
                                                    <Avatar className="mr-2">
                                                        <AvatarImage src={defaultAvatarUrl} alt="Avatar par défaut" className="mr-2" />
                                                    </Avatar>
                                                    {user.username}
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </CommandGroup>
                            )}
                        </CommandList>
                    </Command>
                    {selectedUser && (
                        <div className="mt-4">
                            <Button onClick={handleCreateChat}>Créer le Chat</Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
