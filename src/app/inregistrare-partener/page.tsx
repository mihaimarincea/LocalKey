'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useAuth, useFirestore } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, serverTimestamp, writeBatch } from 'firebase/firestore';
import AppLogo from '@/components/shared/app-logo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const partnerSignupSchema = z.object({
  companyName: z.string().min(1, 'Numele companiei este obligatoriu'),
  cui: z.string().min(1, 'CUI este obligatoriu'),
  regCom: z.string().min(1, 'Nr. Reg. Com. este obligatoriu'),
  address: z.string().min(1, 'Adresa este obligatorie'),
  city: z.string().min(1, 'Orașul este obligatoriu'),
  county: z.string().min(1, 'Județul este obligatoriu'),
  iban: z.string().min(1, 'IBAN este obligatoriu'),
  bank: z.string().min(1, 'Banca este obligatorie'),
  contactName: z.string().min(1, 'Numele persoanei de contact este obligatoriu'),
  contactEmail: z.string().email('Email de contact invalid'),
  contactPhone: z.string().min(1, 'Telefonul de contact este obligatoriu'),
  password: z.string().min(8, 'Parola trebuie să aibă cel puțin 8 caractere'),
});

type PartnerSignupFormValues = z.infer<typeof partnerSignupSchema>;

export default function PartnerSignupPage() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PartnerSignupFormValues>({
    resolver: zodResolver(partnerSignupSchema),
  });

  const onSubmit = async (data: PartnerSignupFormValues) => {
    setLoading(true);
    try {
      // 1. Create the user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, data.contactEmail, data.password);
      const user = userCredential.user;

      // 2. Create the user profile and partner application in Firestore using a batch write
      const batch = writeBatch(firestore);

      const userDocRef = doc(firestore, 'users', user.uid);
      batch.set(userDocRef, {
        id: user.uid,
        email: user.email,
        name: data.contactName,
        role: 'partner',
        createdAt: serverTimestamp(),
      });

      const partnerDocRef = doc(firestore, 'partners', user.uid);
      batch.set(partnerDocRef, {
        id: user.uid,
        companyName: data.companyName,
        cui: data.cui,
        regCom: data.regCom,
        address: data.address,
        city: data.city,
        county: data.county,
        iban: data.iban,
        bank: data.bank,
        contactName: data.contactName,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
        status: 'pending',
        createdAt: serverTimestamp(),
        offerCount: 0,
        totalRedemptions: 0,
      });

      await batch.commit();

      toast({
        title: 'Aplicație trimisă!',
        description: 'Contul tău a fost creat și este în curs de validare. Vei fi notificat prin email.',
      });

      router.push('/login-partener');
    } catch (error: any) {
      console.error("Partner Signup Error:", error);
      toast({
        variant: "destructive",
        title: 'Eroare la înregistrare',
        description: error.message || 'Nu am putut crea contul. Încearcă din nou.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-muted/40 py-12">
        <Card className="w-full max-w-2xl">
            <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                    <AppLogo />
                </div>
                <CardTitle className="text-3xl">Deveniți Partener LocalKey</CardTitle>
                <CardDescription>Completați formularul de mai jos pentru a vă alătura rețelei noastre.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <div className="grid gap-2">
                        <Label htmlFor="companyName">Nume Companie</Label>
                        <Input id="companyName" {...register('companyName')} />
                        {errors.companyName && <p className="text-xs text-destructive">{errors.companyName.message}</p>}
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="contactName">Nume Contact</Label>
                        <Input id="contactName" {...register('contactName')} />
                        {errors.contactName && <p className="text-xs text-destructive">{errors.contactName.message}</p>}
                    </div>
                    
                    <div className="grid gap-2">
                        <Label htmlFor="cui">CUI</Label>
                        <Input id="cui" {...register('cui')} />
                        {errors.cui && <p className="text-xs text-destructive">{errors.cui.message}</p>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="regCom">Nr. Reg. Comerțului</Label>
                        <Input id="regCom" {...register('regCom')} />
                        {errors.regCom && <p className="text-xs text-destructive">{errors.regCom.message}</p>}
                    </div>
                   
                    <div className="md:col-span-2 grid gap-2">
                        <Label htmlFor="address">Adresă Sediu Social</Label>
                        <Input id="address" {...register('address')} />
                        {errors.address && <p className="text-xs text-destructive">{errors.address.message}</p>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="city">Oraș</Label>
                        <Input id="city" {...register('city')} />
                        {errors.city && <p className="text-xs text-destructive">{errors.city.message}</p>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="county">Județ</Label>
                        <Input id="county" {...register('county')} />
                        {errors.county && <p className="text-xs text-destructive">{errors.county.message}</p>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="iban">IBAN</Label>
                        <Input id="iban" {...register('iban')} />
                        {errors.iban && <p className="text-xs text-destructive">{errors.iban.message}</p>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="bank">Bancă</Label>
                        <Input id="bank" {...register('bank')} />
                        {errors.bank && <p className="text-xs text-destructive">{errors.bank.message}</p>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="contactEmail">Email de login</Label>
                        <Input id="contactEmail" type="email" {...register('contactEmail')} />
                        {errors.contactEmail && <p className="text-xs text-destructive">{errors.contactEmail.message}</p>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="contactPhone">Telefon Contact</Label>
                        <Input id="contactPhone" {...register('contactPhone')} />
                        {errors.contactPhone && <p className="text-xs text-destructive">{errors.contactPhone.message}</p>}
                    </div>

                     <div className="md:col-span-2 grid gap-2">
                        <Label htmlFor="password">Parolă</Label>
                        <Input id="password" type="password" {...register('password')} />
                        {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
                    </div>

                    <div className="md:col-span-2 mt-4">
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Trimite Aplicația
                        </Button>
                    </div>
                </form>
                 <div className="mt-6 text-center text-sm">
                    Ai deja un cont de partener?{' '}
                    <Link href="/login-partener" className="underline">
                        Autentifică-te
                    </Link>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
