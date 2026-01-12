"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useAuth, useFirestore } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const signupSchema = z.object({
  email: z.string().email({ message: "Adresă de email invalidă." }),
  password: z.string().min(8, { message: "Parola trebuie să aibă cel puțin 8 caractere." }),
  inviteCode: z.string().min(4, { message: "Codul de invitație este obligatoriu." }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export function SignupForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    setLoading(true);
    try {
      // TODO: Validate invite code against Firestore before creating user
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Create user profile in Firestore
      await setDoc(doc(firestore, "users", user.uid), {
        id: user.uid,
        email: user.email,
        role: "user", // default role
        createdAt: new Date(),
        inviteCodes: [],
      });
      
      toast({
        title: "Cont Creat!",
        description: "Bun venit la LOCALKEY.",
      });
      // Role-based routing is handled in page.tsx
    } catch (error: any) {
       console.error("Signup Error:", error);
      toast({
        variant: "destructive",
        title: "Eroare la Înregistrare",
        description: error.message || "Nu s-a putut crea contul. Verificați codul de invitație și încercați din nou.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
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
  );
}
