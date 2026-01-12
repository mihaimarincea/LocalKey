"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Loader2, ShieldCheck, ShieldOff, WifiOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mockUsers } from "@/lib/data";

const QR_VALIDITY_SECONDS = 60;

export function QrCodeGenerator() {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(QR_VALIDITY_SECONDS);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const generateQrCode = () => {
    setLoading(true);
    // In a real app, this data would be a secure, short-lived token from your backend
    const currentUser = mockUsers.find(u => u.role === 'user');
    const qrData = JSON.stringify({
      userId: currentUser?.id,
      timestamp: new Date().toISOString(),
      // This should be a securely generated token
      token: `dk_tok_${Math.random().toString(36).substr(2, 16)}`, 
    });
    
    const encodedQrData = encodeURIComponent(qrData);
    setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedQrData}&bgcolor=F8F0E3&color=3D342B`);
    setTimeLeft(QR_VALIDITY_SECONDS);
    setLoading(false);
  };

  useEffect(() => {
    generateQrCode();
  }, []);

  useEffect(() => {
    if (qrCodeUrl && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && qrCodeUrl) {
        toast({
            title: "Cod QR Expirat",
            description: "Te rugăm să generezi un nou cod pentru răscumpărare.",
            variant: "destructive"
        })
    }
  }, [qrCodeUrl, timeLeft, toast]);

  const progress = (timeLeft / QR_VALIDITY_SECONDS) * 100;
  const isExpired = timeLeft <= 0;

  return (
    <Card className="w-full max-w-sm text-center shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Codul Tău QR Personal</CardTitle>
        <CardDescription>Prezintă acest cod partenerului pentru a răscumpăra oferta.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-4">
        <div className="relative w-[300px] h-[300px] flex items-center justify-center">
          {loading && <Loader2 className="h-16 w-16 animate-spin text-primary" />}
          {!loading && qrCodeUrl && (
            <>
              <Image
                src={qrCodeUrl}
                alt="Codul tău QR personal"
                width={300}
                height={300}
                className={`transition-opacity duration-500 ${isExpired ? "opacity-10" : "opacity-100"}`}
                unoptimized
              />
              {isExpired && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80">
                  <ShieldOff className="h-16 w-16 text-destructive" />
                  <p className="mt-2 font-bold text-destructive">EXPIRAT</p>
                </div>
              )}
            </>
          )}
          {!loading && !qrCodeUrl && (
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80">
                <WifiOff className="h-16 w-16 text-muted-foreground" />
                <p className="mt-2 font-bold text-muted-foreground">Nu s-a putut genera codul QR</p>
            </div>
          )}
        </div>
        <div className="w-full space-y-2">
            <Progress value={progress} className="h-2" />
            <p className={`text-sm font-mono ${isExpired ? 'text-destructive' : 'text-muted-foreground'}`}>
                {isExpired ? "Cod expirat" : `Expiră în ${timeLeft}s`}
            </p>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        {isExpired ? (
            <Button onClick={generateQrCode} className="w-full">
                Generează Cod Nou
            </Button>
        ) : (
            <div className="flex items-center text-sm text-green-700 dark:text-green-400 p-2 bg-green-50 dark:bg-green-950 rounded-md">
                <ShieldCheck className="h-4 w-4 mr-2" />
                <span>Codul tău este activ și securizat.</span>
            </div>
        )}
      </CardFooter>
    </Card>
  );
}
