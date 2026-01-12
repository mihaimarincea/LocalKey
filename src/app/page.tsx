import Image from 'next/image';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {LoginForm} from '@/components/auth/login-form';
import {SignupForm} from '@/components/auth/signup-form';
import AppLogo from '@/components/shared/app-logo';
import {PlaceHolderImages} from '@/lib/placeholder-images';

export default function AuthPage() {
  const bgImage = PlaceHolderImages.find(img => img.id === "auth-background");

  return (
    <div className="w-full h-screen lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <AppLogo />
            <h1 className="text-3xl font-bold">Welcome</h1>
            <p className="text-balance text-muted-foreground">
              Login or create an account to unlock local deals
            </p>
          </div>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Card className="bg-transparent border-none shadow-none">
                <CardHeader>
                  <CardTitle>Login</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account.
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
                  <CardTitle>Sign Up</CardTitle>
                  <CardDescription>
                    Enter an invite code and your details to create an account.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SignupForm />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-4 text-center text-sm">
            &copy; {new Date().getFullYear()} LOCALKEY. All rights reserved.
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
