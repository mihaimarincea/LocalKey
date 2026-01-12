import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "lucide-react";

export default function AdminReportsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Rapoarte & Analize</CardTitle>
                <CardDescription>Generează și vizualizează analize detaliate ale platformei.</CardDescription>
            </CardHeader>
            <CardContent>
                <div 
                    className="relative flex h-96 w-full items-center justify-center rounded-lg border-2 border-dashed bg-secondary"
                    aria-label="Placeholder Rapoarte"
                >
                  <div className="text-center text-muted-foreground">
                    <BarChart className="mx-auto h-16 w-16" />
                    <p className="mt-2 font-semibold">Panou de Analize</p>
                    <p className="mt-1 text-sm">Aici ar fi disponibile instrumente avansate de raportare.</p>
                  </div>
                </div>
            </CardContent>
        </Card>
    );
}
