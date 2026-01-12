'use client';

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScanLine, VideoOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function QrCodeScanner() {
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const { toast } = useToast();

    useEffect(() => {
        const getCameraPermission = async () => {
          if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            console.error("Media Devices API not supported");
            toast({
              variant: "destructive",
              title: "Eroare Cameră",
              description: "Browser-ul tău nu suportă funcționalitatea camerei.",
            });
            setHasCameraPermission(false);
            return;
          }
    
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
            setHasCameraPermission(true);
    
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          } catch (error) {
            console.error("Error accessing camera:", error);
            setHasCameraPermission(false);
            toast({
              variant: "destructive",
              title: "Acces la Cameră Refuzat",
              description: "Te rugăm să permiți accesul la cameră în setările browser-ului.",
            });
          }
        };
    
        getCameraPermission();
    
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        }
      }, [toast]);


    return (
        <div className="flex h-screen w-full items-center justify-center bg-secondary">
            <Card className="w-full max-w-md mx-4">
                 <CardHeader>
                    <CardTitle className="text-2xl">Validează Răscumpărare</CardTitle>
                    <CardDescription>Scanează codul QR al unui utilizator pentru a-i răscumpăra oferta.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div 
                        className="relative flex aspect-square w-full items-center justify-center rounded-lg border-2 border-dashed bg-secondary mb-6 overflow-hidden"
                        aria-label="Scanner Cod QR"
                    >
                        <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                        { !hasCameraPermission && (
                             <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 text-center p-4">
                                <VideoOff className="mx-auto h-16 w-16 text-muted-foreground" />
                                <p className="mt-2 font-semibold">Camera nu este disponibilă</p>
                                <p className="mt-1 text-sm text-muted-foreground">Permite accesul la cameră pentru a scana.</p>
                            </div>
                        )}
                    </div>
                     { hasCameraPermission && (
                        <div className="flex items-center gap-2">
                            <ScanLine className="h-6 w-6 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">Îndreaptă camera spre un cod QR</p>
                        </div>
                     )}
                     { !hasCameraPermission && (
                        <Alert variant="destructive">
                            <AlertTitle>Acces la Cameră Necesar</AlertTitle>
                            <AlertDescription>
                                Te rugăm să permiți accesul la cameră în setările browser-ului pentru a utiliza această funcționalitate.
                            </AlertDescription>
                        </Alert>
                    )}
                </CardContent>
                 <CardFooter className="flex-col gap-4">
                    <p className="text-xs text-muted-foreground">Sau introduceți codul manual:</p>
                     <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input type="text" placeholder="dk_tok_..." />
                        <Button type="submit">Validează</Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
