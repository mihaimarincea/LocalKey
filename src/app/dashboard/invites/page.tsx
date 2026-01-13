
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockInvites, mockUsers } from "@/lib/data";
import { Copy, Gift } from "lucide-react";
import { format } from "date-fns";
import { ro, enUS } from "date-fns/locale";
import { useLanguage } from "@/contexts/language-context";

export default function InvitesPage() {
    const { t, language } = useLanguage();
    const locale = language === 'ro' ? ro : enUS;
    // In a real app, this would be the logged-in user
    const currentUser = mockUsers.find(u => u.role === 'user');
    const userInvites = mockInvites.filter(inv => inv.invitedBy === currentUser?.id);
    const availableInvites = userInvites.filter(i => i.status === 'available');
    const usedInvites = userInvites.filter(i => i.status === 'used');

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold tracking-tight">{t('dashboardUser.invites.title')}</h1>
                <p className="text-muted-foreground mt-1">{t('dashboardUser.invites.subtitle')}</p>
            </header>
            
            <Card>
                <CardHeader>
                    <CardTitle>{t('dashboardUser.invites.availableCodes')}</CardTitle>
                    <CardDescription>{t('dashboardUser.invites.remainingInvites', { count: availableInvites.length })}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {availableInvites.map(invite => (
                        <div key={invite.code} className="flex items-center justify-between p-4 rounded-lg border bg-secondary/50">
                            <div className="flex items-center gap-4">
                                <Gift className="h-6 w-6 text-primary" />
                                <span className="font-mono text-lg font-medium">{invite.code}</span>
                            </div>
                            <Button size="sm" variant="outline">
                                <Copy className="mr-2 h-4 w-4" />
                                {t('dashboardUser.invites.copyCode')}
                            </Button>
                        </div>
                    ))}
                     {availableInvites.length === 0 && (
                        <div className="text-center text-muted-foreground py-8">
                            <p>{t('dashboardUser.invites.noAvailableInvites')}</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{t('dashboardUser.invites.history')}</CardTitle>
                    <CardDescription>{t('dashboardUser.invites.historySubtitle')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                    {usedInvites.map(invite => (
                        <div key={invite.code} className="flex items-center justify-between p-3 rounded-md border">
                            <div>
                                <p className="font-mono">{invite.code}</p>
                                <p className="text-sm text-muted-foreground">{t('dashboardUser.invites.usedBy', { userId: invite.usedBy, date: format(invite.createdAt as Date, "PPP", { locale }) })}</p>
                            </div>
                            <Badge variant="secondary">{t('dashboardUser.invites.statusUsed')}</Badge>
                        </div>
                    ))}
                     {usedInvites.length === 0 && (
                        <div className="text-center text-muted-foreground py-4">
                            <p>{t('dashboardUser.invites.noUsedInvites')}</p>
                        </div>
                     )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
