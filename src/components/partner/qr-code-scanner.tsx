'use client';

import { useState, useEffect, useRef } from "react";
import jsQR from "jsqr";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScanLine, VideoOff, Loader2, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/language-context";

export function QrCodeScanner() {
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const [scannedData, setScannedData] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(true);
    const [validationStatus, setValidationStatus] = useState<'idle' | 'validating' | 'valid' | 'invalid'>('idle');
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { toast } = useToast();
    const { t } = useLanguage();

    // Request camera permission and start video stream
    useEffect(() => {
        const getCameraPermission = async () => {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                console.error("Media Devices API not supported");
                toast({
                    variant: "destructive",
                    title: t('partnerLayout.scan.cameraError'),
                    description: t('partnerLayout.scan.cameraNotSupported'),
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
                    title: t('partnerLayout.scan.permissionDenied'),
                    description: t('partnerLayout.scan.permissionPlease'),
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
    }, [toast, t]);

    // QR code scanning logic
    useEffect(() => {
        let animationFrameId: number;

        const scan = () => {
            if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA && canvasRef.current && isScanning) {
                const canvas = canvasRef.current;
                const video = videoRef.current;
                const context = canvas.getContext("2d");

                if (context) {
                    canvas.height = video.videoHeight;
                    canvas.width = video.videoWidth;
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                    const code = jsQR(imageData.data, imageData.width, imageData.height, {
                        inversionAttempts: "dontInvert",
                    });

                    if (code) {
                        setScannedData(code.data);
                        setIsScanning(false);
                    }
                }
            }
            animationFrameId = requestAnimationFrame(scan);
        };

        if (hasCameraPermission) {
           animationFrameId = requestAnimationFrame(scan);
        }

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [isScanning, hasCameraPermission]);

    // Process scanned data
    useEffect(() => {
        if (scannedData) {
            setValidationStatus('validating');
            try {
                const data = JSON.parse(scannedData);
                console.log("Scanned Data:", data);

                if (data.userId && data.token) {
                    // This is where you would call your backend to validate the token and userId
                    // and create a redemption record.
                    // For MVP, we'll simulate a successful validation.
                    setTimeout(() => {
                        setValidationStatus('valid');
                        toast({
                            title: t('partnerLayout.scan.validationSuccess'),
                            description: t('partnerLayout.scan.redemptionSuccess', { userId: data.userId.substring(0, 8) }),
                        });
                        
                        // Reset after a few seconds
                        setTimeout(() => {
                           resetScanner();
                        }, 3000);

                    }, 1000);
                } else {
                    throw new Error("Invalid QR code format.");
                }
            } catch (error) {
                console.error("QR Validation Error:", error);
                setValidationStatus('invalid');
                 toast({
                    variant: "destructive",
                    title: t('partnerLayout.scan.invalidQr'),
                    description: t('partnerLayout.scan.notAValidCode'),
                });
                // Reset after a few seconds
                setTimeout(() => {
                    resetScanner();
                }, 3000);
            }
        }
    }, [scannedData, toast, t]);

    const resetScanner = () => {
        setScannedData(null);
        setValidationStatus('idle');
        setIsScanning(true);
    };

    const renderOverlay = () => {
        switch (validationStatus) {
            case 'validating':
                return (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 text-center p-4">
                        <Loader2 className="mx-auto h-16 w-16 animate-spin text-primary" />
                        <p className="mt-4 font-semibold text-lg">{t('partnerLayout.scan.validating')}</p>
                    </div>
                )
            case 'valid':
                 return (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-500/90 text-center p-4">
                        <CheckCircle className="mx-auto h-24 w-24 text-white" />
                        <p className="mt-4 font-bold text-2xl text-white">{t('partnerLayout.scan.validated')}</p>
                    </div>
                )
            case 'invalid':
                 return (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-destructive/90 text-center p-4">
                        <XCircle className="mx-auto h-24 w-24 text-white" />
                        <p className="mt-4 font-bold text-2xl text-white">{t('partnerLayout.scan.invalid')}</p>
                    </div>
                )
            case 'idle':
            default:
                 if (hasCameraPermission === false) {
                     return (
                         <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 text-center p-4">
                            <VideoOff className="mx-auto h-16 w-16 text-muted-foreground" />
                            <p className="mt-2 font-semibold">{t('partnerLayout.scan.cameraNotAvailable')}</p>
                            <p className="mt-1 text-sm text-muted-foreground">{t('partnerLayout.scan.allowCamera')}</p>
                        </div>
                     )
                 }
                 return null;
        }
    }


    return (
        <div className="flex h-screen w-full items-center justify-center bg-secondary">
            <Card className="w-full max-w-md mx-4">
                <CardHeader>
                    <CardTitle className="text-2xl">{t('partnerLayout.scan.title')}</CardTitle>
                    <CardDescription>{t('partnerLayout.scan.subtitle')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative flex aspect-square w-full items-center justify-center rounded-lg border-2 border-dashed bg-secondary mb-6 overflow-hidden">
                        <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                        <canvas ref={canvasRef} className="hidden" />
                        {renderOverlay()}
                    </div>
                    {hasCameraPermission && validationStatus === 'idle' && (
                        <div className="flex items-center gap-2">
                            <ScanLine className="h-6 w-6 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">{t('partnerLayout.scan.pointCamera')}</p>
                        </div>
                    )}
                    {hasCameraPermission === false && (
                        <Alert variant="destructive">
                            <AlertTitle>{t('partnerLayout.scan.permissionNeeded')}</AlertTitle>
                            <AlertDescription>
                                {t('partnerLayout.scan.permissionPlease')}
                            </AlertDescription>
                        </Alert>
                    )}
                </CardContent>
                <CardFooter className="flex-col gap-4">
                    <p className="text-xs text-muted-foreground">{t('partnerLayout.scan.enterManually')}</p>
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input type="text" placeholder="dk_tok_..." />
                        <Button type="submit">{t('partnerLayout.scan.validate')}</Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
