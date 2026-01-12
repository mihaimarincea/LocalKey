import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";

export default function AdminPaymentsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Payment Integration</CardTitle>
                <CardDescription>Manage subscriptions and transactions via Stripe.</CardDescription>
            </CardHeader>
            <CardContent>
                <div 
                    className="relative flex h-96 w-full items-center justify-center rounded-lg border-2 border-dashed bg-secondary"
                    aria-label="Payments placeholder"
                >
                  <div className="text-center text-muted-foreground">
                    <CreditCard className="mx-auto h-16 w-16" />
                    <p className="mt-2 font-semibold">Stripe Integration</p>
                    <p className="mt-1 text-sm">A dashboard for managing payments would appear here.</p>
                  </div>
                </div>
            </CardContent>
        </Card>
    );
}
