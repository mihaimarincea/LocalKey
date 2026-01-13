
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function AdminPaymentsPage() {
    const { t } = useLanguage();
    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('adminLayout.payments.title')}</CardTitle>
                <CardDescription>{t('adminLayout.payments.subtitle')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div 
                    className="relative flex h-96 w-full items-center justify-center rounded-lg border-2 border-dashed bg-secondary"
                    aria-label="Placeholder Plăți"
                >
                  <div className="text-center text-muted-foreground">
                    <CreditCard className="mx-auto h-16 w-16" />
                    <p className="mt-2 font-semibold">{t('adminLayout.payments.placeholderTitle')}</p>
                    <p className="mt-1 text-sm">{t('adminLayout.payments.placeholderDescription')}</p>
                  </div>
                </div>
            </CardContent>
        </Card>
    );
}
