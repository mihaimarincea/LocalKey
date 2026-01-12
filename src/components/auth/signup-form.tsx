
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
import { useAuth, useFirestore, setDocumentNonBlocking } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc } from 'firebase/firestore';

const signupSchema = z.object({
  email: z.string().email({ message: "Adresă de email invalidă." }),
  password: z.string().min(8, { message: "Parola trebuie să aibă cel puțin 8 caractere." }),
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
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      const userDocRef = doc(firestore, "users", user.uid);
      const newUser = {
        id: user.uid,
        email: user.email,
        name: user.email?.split('@')[0] || 'Utilizator nou',
        avatarUrl: `https://avatar.vercel.sh/${user.email}.png`,
        role: "user", // default role
        createdAt: new Date(),
        inviteCodeCount: 0,
      };
      
      // Create user profile in Firestore
      setDocumentNonBlocking(userDocRef, newUser, { merge: true });
      
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
        description: error.message || "Nu s-a putut crea contul. Încercați din nou.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
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
