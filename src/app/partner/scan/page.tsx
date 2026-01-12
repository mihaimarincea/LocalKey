import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScanLine, Video } from "lucide-react";

export default function PartnerScanPage() {
    return (
        <div className="flex flex-col items-center gap-6">
            <header className="text-center">
                <h1 className="text-3xl font-bold tracking-tight">Validează Răscumpărare</h1>
                <p className="text-muted-foreground mt-1">Scanează codul QR al unui utilizator pentru a-i răscumpăra oferta.</p>
            </header>
            <Card className="w-full max-w-md">
                <CardContent className="p-6">
                    <div 
                        className="relative flex aspect-square w-full items-center justify-center rounded-lg border-2 border-dashed bg-secondary mb-6"
                        aria-label="Placeholder Scaner Cod QR"
                    >
                      <div className="text-center text-muted-foreground">
                        <Video className="mx-auto h-16 w-16" />
                        <p className="mt-2 font-semibold">Vizualizare Cameră</p>
                        <p className="mt-1 text-sm">Aici ar apărea un flux video live de la cameră.</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <ScanLine className="h-6 w-6 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Îndreaptă camera spre un cod QR</p>
                    </div>
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
