import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "lucide-react";

export default function AdminReportsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Reporting & Analytics</CardTitle>
                <CardDescription>Generate and view detailed platform analytics.</CardDescription>
            </CardHeader>
            <CardContent>
                <div 
                    className="relative flex h-96 w-full items-center justify-center rounded-lg border-2 border-dashed bg-secondary"
                    aria-label="Reports placeholder"
                >
                  <div className="text-center text-muted-foreground">
                    <BarChart className="mx-auto h-16 w-16" />
                    <p className="mt-2 font-semibold">Analytics Dashboard</p>
                    <p className="mt-1 text-sm">Advanced reporting tools would be available here.</p>
                  </div>
                </div>
            </CardContent>
        </Card>
    );
}
