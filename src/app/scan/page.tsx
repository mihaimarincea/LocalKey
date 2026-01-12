'use client';

import { useState } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { QrCodeScanner } from "@/components/partner/qr-code-scanner";
import { useUser, useDoc, useFirestore, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import type { User } from "@/types";
import AppLogo from "@/components/shared/app-logo";

export default function ScanPage() {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();

    const userDocRef = useMemoFirebase(() => user ? doc(firestore, `users/${user.uid}`) : null, [user, firestore]);
    const { data: userProfile, isLoading: isProfileLoading } = useDoc<User>(userDocRef);

    const [isScanning, setIsScanning] = useState(false);

    if (isUserLoading || isProfileLoading) {
        return (
            <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
                <AppLogo />
                <p className="mt-4 text-muted-foreground">Se încarcă...</p>
            </div>
        );
    }
    
    // If user is logged in and is a partner, show scanner.
    if (user && userProfile?.role === 'partner') {
        return <QrCodeScanner />;
    }

    // If user is logged in but not a partner, or not logged in, show login form.
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-background px-4">
            <div className="w-full max-w-sm">
                <div className="mb-6 text-center">
                    <AppLogo />
                    <h1 className="mt-4 text-2xl font-bold">Acces Partener</h1>
                    <p className="text-muted-foreground">Autentifică-te pentru a valida coduri QR.</p>
                </div>
                <LoginForm />
            </div>
        </div>
    );
}
