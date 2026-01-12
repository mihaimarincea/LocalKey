'use client';
import Image from 'next/image';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {LoginForm} from '@/components/auth/login-form';
import {SignupForm} from '@/components/auth/signup-form';
import AppLogo from '@/components/shared/app-logo';
import {PlaceHolderImages} from '@/lib/placeholder-images';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthPage() {
  const bgImage = PlaceHolderImages.find(img => img.id === "auth-background");
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && user) {
      // TODO: Add role based routing
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center">
          <AppLogo />
          <p className="mt-4 text-muted-foreground">Se încarcă...</p>
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
            <h1 className="text-3xl font-bold">Bun venit</h1>
            <p className="text-balance text-muted-foreground">
              Autentifică-te sau creează un cont pentru a debloca oferte locale
            </p>
          </div>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Autentificare</TabsTrigger>
              <TabsTrigger value="signup">Înregistrare</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Card className="bg-transparent border-none shadow-none">
                <CardHeader>
                  <CardTitle>Autentificare</CardTitle>
                  <CardDescription>
                    Introdu datele tale pentru a accesa contul.
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
                  <CardTitle>Înregistrare</CardTitle>
                  <CardDescription>
                    Introdu un cod de invitație și datele tale pentru a crea un cont.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SignupForm />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-4 text-center text-sm">
            &copy; {new Date().getFullYear()} LOCALKEY. Toate drepturile rezervate.
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
