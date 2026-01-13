'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, where } from "firebase/firestore";
import type { Invite, User } from "@/types";
import { Copy, Gift } from "lucide-react";
import { format } from "date-fns";
import { ro, enUS } from "date-fns/locale";
import { useLanguage } from "@/contexts/language-context";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function InvitesPage() {
    const { t, language } = useLanguage();
    const locale = language === 'ro' ? ro : enUS;
    const { user } = useUser();
    const firestore = useFirestore();
    const { toast } = useToast();

    const invitesRef = useMemoFirebase(() => collection(firestore, 'invite_codes'), [firestore]);
    const userInvitesQuery = useMemoFirebase(
        () => user ? query(invitesRef, where("generatedBy", "==", user.uid)) : null,
        [user, invitesRef]
    );

    const { data: userInvites, isLoading } = useCollection<Invite>(userInvitesQuery);

    const availableInvites = userInvites?.filter(i => i.status === 'available') || [];
    const usedInvites = userInvites?.filter(i => i.status === 'used') || [];

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        toast({ title: "Cod copiat!", description: "Codul de invitație a fost copiat în clipboard." });
    };

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
                    {isLoading && Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-16 w-full rounded-lg" />)}
                    {availableInvites.map(invite => (
                        <div key={invite.id} className="flex items-center justify-between p-4 rounded-lg border bg-secondary/50">
                            <div className="flex items-center gap-4">
                                <Gift className="h-6 w-6 text-primary" />
                                <span className="font-mono text-lg font-medium">{invite.code}</span>
                            </div>
                            <Button size="sm" variant="outline" onClick={() => handleCopy(invite.code)}>
                                <Copy className="mr-2 h-4 w-4" />
                                {t('dashboardUser.invites.copyCode')}
                            </Button>
                        </div>
                    ))}
                     {!isLoading && availableInvites.length === 0 && (
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
                    {isLoading && Array.from({ length: 1 }).map((_, i) => <Skeleton key={i} className="h-14 w-full rounded-md" />)}
                    {usedInvites.map(invite => {
                        const redeemedAtDate = invite.redeemedAt ? (invite.redeemedAt as any).toDate() : null;
                        return (
                        <div key={invite.id} className="flex items-center justify-between p-3 rounded-md border">
                            <div>
                                <p className="font-mono">{invite.code}</p>
                                {invite.redeemedByUserId && redeemedAtDate &&
                                <p className="text-sm text-muted-foreground">{t('dashboardUser.invites.usedBy', { userId: invite.redeemedByUserId.substring(0,8) + '...', date: format(redeemedAtDate, "PPP", { locale }) })}</p>
                                }
                            </div>
                            <Badge variant="secondary">{t('dashboardUser.invites.statusUsed')}</Badge>
                        </div>
                    )})}
                     {!isLoading && usedInvites.length === 0 && (
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
