"use client";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import React, {useState} from "react";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const formSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(5),
});

export default function Register() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const [loading, setLoading] = useState(false)

const handleSubmit = async (values: z.infer<typeof formSchema>) => {
  try {
    setLoading(true)
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      if (response.status === 400 && data.error === 'User Already Exists') {
        throw new Error('User Already Exists');
      } else {
        throw new Error(data.error || 'Something went wrong');
      }
    }
  
    toast.success("User created successfully!");
    console.log(data);
    router.push("/");
  } catch (error: any) {
    toast.error(error.message);
    console.error(error);
  }finally{
    setLoading(false)
  } 
};


  return (
    <main className="bg-secondary flex min-h-screen flex-col items-center justify-between pt-44">
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Inscription</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="max-w-md w-full flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Username"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Email address"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Password" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <Button type="submit" className="w-full">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign up"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Link href="/" className="">
            <p className="">Déjà un compte ? Se connecter ici</p>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}