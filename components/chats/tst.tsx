"use client";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { MailPlus } from 'lucide-react';

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  import { Textarea } from "@/components/ui/textarea";
  import { Label } from "@/components/ui/label";
  import { ScrollArea } from "@/components/ui/scroll-area"


export default function Chat() {
    return (
        <>
        <main className="flex justify-center items-stretch p">
            <div className="">
                <Card className="w-auto">
                    <CardHeader>
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
                            <CommandInput placeholder="Search chat"/>
                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup heading="Chats">
                                <CommandItem>
                                <Avatar className="mr-2">
                                    <AvatarFallback>SD</AvatarFallback>
                                </Avatar>
                                <span>Simon Diouf</span>
                                </CommandItem>
                                <CommandItem>
                                <Avatar className="mr-2">
                                    <AvatarFallback>AS</AvatarFallback>
                                </Avatar>
                                <span>Abdoulaye Sarré</span>
                                </CommandItem>
                                <CommandItem>
                                <Avatar className="mr-2">
                                    <AvatarFallback>AD</AvatarFallback>
                                </Avatar>
                                <span>Annakham</span>
                                </CommandItem>
                                </CommandGroup>
                            </CommandList>
                            
                        </Command>
                        </DialogContent>
                    </Dialog>
                        <Command>
                            <CommandInput placeholder="Chercher une personne"/>
                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup heading="Chats">
                                <CommandItem>
                                <Avatar className="mr-2">
                                    <AvatarFallback>SD</AvatarFallback>
                                </Avatar>
                                <span>Simon Diouf</span>
                                </CommandItem>
                                <CommandItem>
                                <Avatar className="mr-2">
                                    <AvatarFallback>AS</AvatarFallback>
                                </Avatar>
                                <span>Abdoulaye Sarré</span>
                                </CommandItem>
                                <CommandItem>
                                <Avatar className="mr-2">
                                    <AvatarFallback>AD</AvatarFallback>
                                </Avatar>
                                <span>Annakham</span>
                                </CommandItem>
                                </CommandGroup>
                            </CommandList>
                            
                        </Command>
                    </CardHeader>
                </Card>
            </div>
            <div className="">
                <Card className="w-auto">
                    <CardHeader>
                        <div className="flex">
                        <Avatar className="mr-2">
                            <AvatarFallback>SD</AvatarFallback>
                            
                        </Avatar>
                            <span className="self-center">Simon Diouf</span>    
                        </div>
                    </CardHeader>
                    <CardContent>
                    <ScrollArea className="h-[300px] w-[800px] rounded-md border p-2">
                        <div className="p-4">
            <div className="p-4 space-y-4">
                {/* Message reçu */}
                    <div className="flex justify-start">
                    <Avatar className="mr-2">
                        <AvatarFallback>SD</AvatarFallback>
                    </Avatar>
                        <div className="bg-gray-200 p-2 rounded-md">
                        <p>Salut</p>
                        </div>
                    </div>
                    {/* Message envoyé */}
                    <div className="flex justify-end">
                      <div className="bg-blue-500 text-white p-2 rounded-md">
                        <p>Yo nkm</p>
                      </div>
                      <Avatar className="ml-2">
                        <AvatarFallback>AS</AvatarFallback>
                    </Avatar>
                    </div>
                    {/* Message reçu */}
                    <div className="flex justify-start">
                    <Avatar className="mr-2">
                        <AvatarFallback>SD</AvatarFallback>
                    </Avatar>
                        <div className="bg-gray-200 p-2 rounded-md">
                        <p>ça va et toi</p>
                        </div>
                    </div>
                    {/* Message envoyé */}
                    <div className="flex justify-end">
                      <div className="bg-blue-500 text-white p-2 rounded-md">
                        <p>traquille</p>
                      </div>
                      <Avatar className="ml-2">
                        <AvatarFallback>AS</AvatarFallback>
                    </Avatar>
                    </div>
                    {/* Message reçu */}
                    <div className="flex justify-start">
                    <Avatar className="mr-2">
                        <AvatarFallback>SD</AvatarFallback>
                    </Avatar>
                        <div className="bg-[#2c2f3f] text-white p-2 rounded-md">
                        <p>quoi de neuf</p>
                        </div>
                    </div>
                    {/* Message envoyé */}
                    <div className="flex justify-end">
                      <div className="bg-[#1a1c23] text-white p-2 rounded-md">
                        <p>rien igo de ton coté?</p>
                      </div>
                      <Avatar className="ml-2">
                        <AvatarFallback>AS</AvatarFallback>
                    </Avatar>
                    </div>
                    {/* Ajoutez d'autres messages ici */}
                </div>
                        </div>
                    </ScrollArea>
                    </CardContent>
                    <CardFooter>
                    <div className="grid w-full gap-1.5">
                            <Label htmlFor="message">Your message</Label>
                            <span className="flex ">
                            <Textarea name="" placeholder="Type your message here." id="" cols={75} rows={4}></Textarea>
                            <Button className="w-20 self-center ml-1">Send</Button>
                            </span>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </main>
        </>
    );
}