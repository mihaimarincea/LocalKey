"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Loader2, ShieldCheck, ShieldOff, WifiOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/firebase";
import { useLanguage } from "@/contexts/language-context";

const QR_VALIDITY_SECONDS = 60;

export function QrCodeGenerator() {
  const { user } = useUser();
  const { t } = useLanguage();
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(QR_VALIDITY_SECONDS);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const generateQrCode = () => {
    if (!user) {
        setLoading(false);
        toast({ title: t('dashboardUser.qr.unauthenticated'), description: t('dashboardUser.qr.pleaseLogin'), variant: "destructive"});
        return;
    };

    setLoading(true);
    // In a real app, this data would be a secure, short-lived token from your backend
    const qrData = JSON.stringify({
      userId: user.uid,
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (qrCodeUrl && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && qrCodeUrl) {
        toast({
            title: t('dashboardUser.qr.expiredTitle'),
            description: t('dashboardUser.qr.expiredDescription'),
            variant: "destructive"
        })
    }
  }, [qrCodeUrl, timeLeft, toast, t]);

  const progress = (timeLeft / QR_VALIDITY_SECONDS) * 100;
  const isExpired = timeLeft <= 0;

  return (
    <Card className="w-full max-w-sm text-center shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">{t('dashboardUser.qr.personalCode')}</CardTitle>
        <CardDescription>{t('dashboardUser.qr.presentCode')}</CardDescription>
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
                  <p className="mt-2 font-bold text-destructive">{t('dashboardUser.qr.expired').toLocaleUpperCase()}</p>
                </div>
              )}
            </>
          )}
          {!loading && !qrCodeUrl && (
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80">
                <WifiOff className="h-16 w-16 text-muted-foreground" />
                <p className="mt-2 font-bold text-muted-foreground">{t('dashboardUser.qr.couldNotGenerate')}</p>
            </div>
          )}
        </div>
        <div className="w-full space-y-2">
            <Progress value={progress} className="h-2" />
            <p className={`text-sm font-mono ${isExpired ? 'text-destructive' : 'text-muted-foreground'}`}>
                {isExpired ? t('dashboardUser.qr.expired') : t('dashboardUser.qr.expiresIn', { timeLeft })}
            </p>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        {isExpired ? (
            <Button onClick={generateQrCode} className="w-full">
                {t('dashboardUser.qr.generateNew')}
            </Button>
        ) : (
            <div className="flex items-center text-sm text-green-700 dark:text-green-400 p-2 bg-green-50 dark:bg-green-950 rounded-md">
                <ShieldCheck className="h-4 w-4 mr-2" />
                <span>{t('dashboardUser.qr.activeAndSecure')}</span>
            </div>
        )}
      </CardFooter>
    </Card>
  );
}
