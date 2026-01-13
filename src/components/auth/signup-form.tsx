"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useAuth, useFirestore, setDocumentNonBlocking } from '@/firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, serverTimestamp, collection, query, where, getDocs, writeBatch } from 'firebase/firestore';
import { useLanguage } from '@/contexts/language-context';

const GoogleIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );

export function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const { toast } = useToast();
  const auth = useAuth();
  const firestore = useFirestore();
  const { t } = useLanguage();

  const signupSchema = z.object({
    email: z.string().email({ message: t('validation.invalidEmail') }),
    password: z.string().min(8, { message: t('validation.passwordTooShort', { min: 8 }) }),
    inviteCode: z.string().min(1, { message: "Invite code is required." }),
  });

  type SignupFormValues = z.infer<typeof signupSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const validateAndGetInviteDoc = async (code: string) => {
    const invitesRef = collection(firestore, 'invite_codes');
    const q = query(invitesRef, where('code', '==', code), where('status', '==', 'available'));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        toast({
            variant: "destructive",
            title: "Invalid Invite Code",
            description: "The invite code is either invalid or has already been used.",
        });
        return null;
    }
    return querySnapshot.docs[0];
  };

  const processRegistration = async (user: any, inviteDoc: any) => {
    const batch = writeBatch(firestore);

    // 1. Create user document
    const userDocRef = doc(firestore, "users", user.uid);
    const newUser = {
        id: user.uid,
        email: user.email,
        name: user.displayName || user.email?.split('@')[0] || 'New User',
        avatarUrl: user.photoURL || `https://avatar.vercel.sh/${user.email}.png`,
        role: "user",
        createdAt: serverTimestamp(),
        inviteCodeCount: 3, // Initial invite codes for a new user
    };
    batch.set(userDocRef, newUser);

    // 2. Update invite code document
    const inviteDocRef = doc(firestore, "invite_codes", inviteDoc.id);
    batch.update(inviteDocRef, {
        status: 'used',
        redeemedByUserId: user.uid,
        redeemedAt: serverTimestamp()
    });

    await batch.commit();

    toast({
        title: t('toast.signUpSuccessTitle'),
        description: t('toast.welcomeTo'),
    });
  };

  const handleGoogleSignUp = async () => {
    if (!inviteCode) {
        toast({ variant: "destructive", title: "Invite code required" });
        return;
    }
    setLoading(true);

    const inviteDoc = await validateAndGetInviteDoc(inviteCode);
    if (!inviteDoc) {
        setLoading(false);
        return;
    }

    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await processRegistration(result.user, inviteDoc);
    } catch (error: any) {
      console.error("Google Sign Up Error:", error);
      toast({
        variant: "destructive",
        title: t('toast.googleSignUpErrorTitle'),
        description: error.message || t('toast.googleSignUpErrorDescription'),
      });
    } finally {
      setLoading(false);
    }
  };


  const onSubmit = async (data: SignupFormValues) => {
    setLoading(true);

    const inviteDoc = await validateAndGetInviteDoc(data.inviteCode);
    if (!inviteDoc) {
        setLoading(false);
        return;
    }
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await processRegistration(userCredential.user, inviteDoc);
    } catch (error: any) {
       console.error("Signup Error:", error);
      toast({
        variant: "destructive",
        title: t('toast.signUpErrorTitle'),
        description: error.message || t('toast.signUpErrorDescription'),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="inviteCode">Invite Code</Label>
        <Input
            id="inviteCode"
            placeholder="LOCAL-XXXXX"
            {...register('inviteCode')}
            onChange={(e) => {
                setInviteCode(e.target.value);
                setValue('inviteCode', e.target.value);
            }}
            disabled={loading}
        />
        {errors.inviteCode && <p className="text-xs text-destructive">{errors.inviteCode.message}</p>}
      </div>

       <Button variant="outline" className="w-full" onClick={handleGoogleSignUp} disabled={loading || !inviteCode}>
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon />}
        {t('authPage.continueWithGoogle')}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {t('authPage.orContinueWith')}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">{t('email')}</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register('email')}
            disabled={loading}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">{t('password')}</Label>
          <Input id="password" type="password" {...register('password')} disabled={loading} />
          {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
        </div>
        <Button type="submit" className="w-full" disabled={loading || !inviteCode}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {t('authPage.createAccount')}
        </Button>
      </form>
    </div>
  );
}
