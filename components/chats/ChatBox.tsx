"use client";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
  } from "@/components/ui/card";
  import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, 
    CommandSeparator, CommandShortcut,
  } from "@/components/ui/command";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  import { Textarea } from "@/components/ui/textarea";
  import { Label } from "@/components/ui/label";
  import { ScrollArea } from "@/components/ui/scroll-area"


export default function ChatBox() {
    return (
        <>
            <CardContent>
                    <ScrollArea className="h-[300px] w-[800px] rounded-md border p-2">
                        <div className="p-4">
            <div className="p-4 space-y-4">
                {/* Message reçu */}
                    <div className="flex justify-start">
                    <Avatar className="mr-2">
                        <AvatarFallback>SD</AvatarFallback>
                    </Avatar>
                        <div className="bg-[#2c2f3f] p-2 rounded-md">
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
                        <div className="bg-[#2c2f3f] p-2 rounded-md">
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
                      <div className="bg-blue-500 text-white p-2 rounded-md">
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
        </>
    );
}