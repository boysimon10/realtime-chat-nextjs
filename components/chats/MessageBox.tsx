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
  import { Textarea } from "@/components/ui/textarea";
  import { Label } from "@/components/ui/label";


export default function Chat() {
    return (
        <>
                    <CardFooter>
                    <div className="grid w-full gap-1.5">
                            <Label htmlFor="message">Your message</Label>
                            <span className="flex ">
                            <Textarea name="" placeholder="Type your message here." id="" cols={75} rows={4}></Textarea>
                            <Button className="w-20 self-center ml-1">Send</Button>
                            </span>
                        </div>
                    </CardFooter>
        </>
    );
}