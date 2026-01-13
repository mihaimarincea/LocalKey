
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function AdminReportsPage() {
    const { t } = useLanguage();
    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('adminLayout.reports.title')}</CardTitle>
                <CardDescription>{t('adminLayout.reports.subtitle')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div 
                    className="relative flex h-96 w-full items-center justify-center rounded-lg border-2 border-dashed bg-secondary"
                    aria-label="Placeholder Rapoarte"
                >
                  <div className="text-center text-muted-foreground">
                    <BarChart className="mx-auto h-16 w-16" />
                    <p className="mt-2 font-semibold">{t('adminLayout.reports.placeholderTitle')}</p>
                    <p className="mt-1 text-sm">{t('adminLayout.reports.placeholderDescription')}</p>
                  </div>
                </div>
            </CardContent>
        </Card>
    );
}
