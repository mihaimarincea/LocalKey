import type {Metadata} from 'next';
import {cn} from '@/lib/utils';
import {Toaster} from '@/components/ui/toaster';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase';
import { LanguageProvider } from '@/contexts/language-context';

export const metadata: Metadata = {
  title: 'LocalKey',
  description: 'Unlock local deals.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased min-h-screen bg-background font-sans')}>
        <LanguageProvider>
          <FirebaseClientProvider>
            {children}
          </FirebaseClientProvider>
        </LanguageProvider>
        <Toaster />
      </body>
    </html>
  );
}
