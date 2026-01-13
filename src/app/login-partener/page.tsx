'use client';

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
import { useAuth, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import AppLogo from '@/components/shared/app-logo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Partner } from '@/types';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email('Adresă de email invalidă.'),
  password: z.string().min(1, 'Parola este obligatorie.'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function PartnerLoginPage() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      const partnerDocRef = doc(firestore, 'partners', user.uid);
      const userDocRef = doc(firestore, 'users', user.uid);
      
      const partnerDoc = await doc(firestore, 'partners', user.uid).get();
      const userDoc = await doc(firestore, 'users', user.uid).get();

      if (!userDoc.exists() || userDoc.data()?.role !== 'partner' || !partnerDoc.exists()) {
        throw new Error('Nu a fost găsit un cont de partener asociat cu acest email.');
      }
      
      const partnerData = partnerDoc.data() as Partner;

      if (partnerData.status === 'pending') {
         throw new Error('Contul tău este în curs de aprobare. Vei fi notificat prin email.');
      }

      if (partnerData.status === 'rejected') {
        throw new Error('Contul tău a fost respins. Contactează suportul pentru detalii.');
      }

      // If approved, proceed to dashboard
      toast({
        title: 'Autentificare reușită!',
        description: 'Bun venit în panoul de control al partenerului.',
      });
      router.push('/partner/dashboard');

    } catch (error: any) {
      console.error("Partner Login Error:", error);
      toast({
        variant: "destructive",
        title: 'Eroare de Autentificare',
        description: error.message || 'A apărut o problemă. Verifică datele și încearcă din nou.',
      });
      auth.signOut(); // Sign out if validation fails after login
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <Card>
            <CardHeader className="text-center">
                <div className='mx-auto mb-4'>
                    <AppLogo />
                </div>
                <CardTitle>Acces Parteneri</CardTitle>
                <CardDescription>Autentifică-te pentru a accesa panoul de control.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                    id="email"
                    type="email"
                    placeholder="contact@companie.ro"
                    {...register('email')}
                    disabled={loading}
                    />
                    {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Parolă</Label>
                    <Input id="password" type="password" {...register('password')} disabled={loading} />
                    {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Autentificare
                </Button>
                </form>
                <div className="mt-4 text-center text-sm">
                  Nu ai un cont?{' '}
                  <Link href="/inregistrare-partener" className="underline">
                    Aplică acum
                  </Link>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
