"use client";
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from "next/navigation"
import * as z from "zod";
import { useForm } from "react-hook-form";
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


const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
  });

export default function Login() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/auth/[...nextauth]", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error);
      }

      // Si la requête est réussie, vous pouvez rediriger l'utilisateur ou effectuer d'autres actions
      // Par exemple, rediriger vers une page de tableau de bord
      router.push("/chats");
  } catch (error) {
      console.error("Login error:", error);
      // Gérer l'erreur, par exemple afficher un message d'erreur à l'utilisateur
  }
  };

  return (
    <main className="bg-secondary flex min-h-screen flex-col items-center justify-between pt-44">
       
      <Card>
      <CardHeader> 
        <CardTitle>Login</CardTitle>
        <CardDescription>Connexion</CardDescription>
      </CardHeader>
      <CardContent>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
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
            Login
          </Button>
        </form>
      </Form>
      </CardContent>
      <CardFooter>
          <Link href="/register" className="">
            <p className="">S'inscrire ici</p>
          </Link>
      </CardFooter>
      </Card>
    </main>
  );
}