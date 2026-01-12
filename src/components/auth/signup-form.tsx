"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

const signupSchema = z.object({
  email: z.string().email({ message: "Adresă de email invalidă." }),
  password: z.string().min(8, { message: "Parola trebuie să aibă cel puțin 8 caractere." }),
  inviteCode: z.string().min(4, { message: "Codul de invitație este obligatoriu." }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormValues) => {
    setLoading(true);
    console.log("Date înregistrare:", data);

    // Simulare apel API
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Cont Creat!",
        description: "Bun venit la LOCALKEY.",
      });
      setShowSuccessDialog(true);
    }, 1500);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="invite-code">Cod de Invitație</Label>
          <Input id="invite-code" placeholder="LOCAL-XXXX" {...register('inviteCode')} />
          {errors.inviteCode && <p className="text-xs text-destructive">{errors.inviteCode.message}</p>}
        </div>
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
          <Label htmlFor="password">Parolă</Label>
          <Input id="password" type="password" {...register('password')} />
          {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Creează cont
        </Button>
      </form>
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Înregistrare Reușită!</AlertDialogTitle>
            <AlertDialogDescription>
              Bun venit! Fiind o aplicație demonstrativă, poți naviga la oricare dintre panourile de control pentru a explora.
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
