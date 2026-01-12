"use client";

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: "Adresă de email invalidă." }),
  password: z.string().min(6, { message: "Parola trebuie să aibă cel puțin 6 caractere." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    setLoading(true);
    console.log("Date autentificare:", data);

    // Simulare apel API
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Autentificare Reușită",
        description: "Bun venit înapoi!",
      });
      setShowSuccessDialog(true);
    }, 1500);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@exemplu.com"
            {...register('email')}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Parolă</Label>
            <Link href="#" className="ml-auto inline-block text-sm underline">
              Ai uitat parola?
            </Link>
          </div>
          <Input id="password" type="password" {...register('password')} />
          {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Autentificare
        </Button>
        <Button variant="outline" className="w-full">
          Autentificare cu SMS OTP
        </Button>
      </form>

      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Autentificare Reușită!</AlertDialogTitle>
            <AlertDialogDescription>
              Fiind o aplicație demonstrativă, poți naviga la oricare dintre panourile de control.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-col">
            <AlertDialogAction asChild>
              <Link href="/dashboard">Mergi la Panoul Utilizatorului</Link>
            </AlertDialogAction>
            <AlertDialogAction asChild>
              <Link href="/partner/dashboard">Mergi la Panoul Partenerului</Link>
            </AlertDialogAction>
            <AlertDialogAction asChild>
               <Link href="/admin/dashboard">Mergi la Panoul de Administrare</Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
