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
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

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

    const handleUserSelect = (user: User) => {
        setSelectedUser(user);
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
                    members: [currentUser._id, selectedUser._id],
                    messages: [],
                }),
            });

            if (!response.ok) {
                throw new Error('Échec de la création du chat');
            }

            const data = await response.json();
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
                        <CommandInput placeholder="Chercher une personne" />
                        <CommandList>
                            {filteredUsers.length === 0 ? (
                                <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
                            ) : (
                                <CommandGroup heading="Chats">
                                    {filteredUsers.map(user => (
                                        <CommandItem 
                                            key={user._id}
                                            onSelect={() => handleUserSelect(user)}
                                        >
                                            <Avatar className="mr-2">
                                                <AvatarImage src={defaultAvatarUrl} alt="Avatar par défaut" className="mr-2" />
                                            </Avatar>
                                            <span>{user.username}</span>
                                        </CommandItem>
                                    ))}
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
