'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LanguageSelector, useLanguage } from "@/contexts/language-context";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
    const { t } = useLanguage();

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold tracking-tight">{t('userNav.settings')}</h1>
                <p className="text-muted-foreground mt-1">Manage your account and language preferences.</p>
            </header>
            
            <Card>
                <CardHeader>
                    <CardTitle>Language</CardTitle>
                    <CardDescription>Choose the language for the application interface.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                   <Label>Language</Label>
                   <LanguageSelector />
                </CardContent>
            </Card>

        </div>
    );
}
