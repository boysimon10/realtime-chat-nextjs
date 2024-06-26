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


export default function ChatList() {
    return (
        <>
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
        </>
    );
}