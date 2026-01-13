
'use client';
import Image from 'next/image';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {LoginForm} from '@/components/auth/login-form';
import {SignupForm} from '@/components/auth/signup-form';
import AppLogo from '@/components/shared/app-logo';
import {PlaceHolderImages} from '@/lib/placeholder-images';
import { useUser, useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { User } from '@/types';
import { doc } from 'firebase/firestore';
import { useLanguage, LanguageSelector } from '@/contexts/language-context';

export default function AuthPage() {
  const bgImage = PlaceHolderImages.find(img => img.id === "auth-background");
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();
  const { t } = useLanguage();

  const userDocRef = useMemoFirebase(() => user ? doc(firestore, `users/${user.uid}`) : null, [user, firestore]);
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<User>(userDocRef);

  useEffect(() => {
    if (!isUserLoading && !isProfileLoading && user && userProfile) {
        switch (userProfile.role) {
            case 'admin':
                router.push('/admin/dashboard');
                break;
            case 'partner':
                router.push('/partner/dashboard');
                break;
            default:
                router.push('/dashboard');
                break;
        }
    }
  }, [user, userProfile, isUserLoading, isProfileLoading, router]);

  if (isUserLoading || user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center">
          <AppLogo />
          <p className="mt-4 text-muted-foreground">{t('loading')}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <AppLogo />
            <h1 className="text-3xl font-bold">{t('welcome')}</h1>
            <p className="text-balance text-muted-foreground">
              {t('authPage.subtitle')}
            </p>
          </div>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">{t('login')}</TabsTrigger>
              <TabsTrigger value="signup">{t('signUp')}</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Card className="bg-transparent border-none shadow-none">
                <CardHeader>
                  <CardTitle>{t('login')}</CardTitle>
                  <CardDescription>
                    {t('authPage.loginDescription')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <LoginForm />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="signup">
              <Card className="bg-transparent border-none shadow-none">
                <CardHeader>
                  <CardTitle>{t('signUp')}</CardTitle>
                  <CardDescription>
                    {t('authPage.signUpDescription')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SignupForm />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-center">
            <LanguageSelector />
          </div>

          <div className="mt-4 text-center text-sm">
            &copy; {new Date().getFullYear()} LOCALKEY. {t('allRightsReserved')}.
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        {bgImage && (
          <Image
            src={bgImage.imageUrl}
            alt={bgImage.description}
            width="1920"
            height="1080"
            priority
            data-ai-hint={bgImage.imageHint}
            className="h-full w-full object-cover dark:brightness-[0.3]"
          />
        )}
      </div>
    </div>
  );
}
