"use client";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
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
                    <ScrollArea className="h-[300px] w-[800px] rounded-md border p-4">
                        <div className="p-4">
                        
                        </div>
                    </ScrollArea>
                    </CardContent>
                    <CardFooter>
                    <div className="grid w-full gap-1.5">
                            <Label htmlFor="message">Your message</Label>
                            <Textarea name="" placeholder="Type your message here." id="" cols={75} rows={4}></Textarea>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </main>
        </>
    );
}