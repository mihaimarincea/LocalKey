import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockInvites, mockUsers } from "@/lib/data";
import { Copy, Gift } from "lucide-react";
import { format } from "date-fns";
import { ro } from "date-fns/locale";

export default function InvitesPage() {
    // In a real app, this would be the logged-in user
    const currentUser = mockUsers.find(u => u.role === 'user');
    const userInvites = mockInvites.filter(inv => inv.invitedBy === currentUser?.id);
    const availableInvites = userInvites.filter(i => i.status === 'available');
    const usedInvites = userInvites.filter(i => i.status === 'used');

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold tracking-tight">Invitațiile Tale</h1>
                <p className="text-muted-foreground mt-1">Invită prieteni pe LOCALKEY și deblochează recompense.</p>
            </header>
            
            <Card>
                <CardHeader>
                    <CardTitle>Coduri Disponibile</CardTitle>
                    <CardDescription>Ai {availableInvites.length} invitații rămase.</CardDescription>
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
                                Copiază Cod
                            </Button>
                        </div>
                    ))}
                     {availableInvites.length === 0 && (
                        <div className="text-center text-muted-foreground py-8">
                            <p>Nu ai invitații disponibile în acest moment.</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Istoric Invitații</CardTitle>
                    <CardDescription>Vezi starea invitațiilor pe care le-ai trimis.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                    {usedInvites.map(invite => (
                        <div key={invite.code} className="flex items-center justify-between p-3 rounded-md border">
                            <div>
                                <p className="font-mono">{invite.code}</p>
                                <p className="text-sm text-muted-foreground">Folosit de Utilizator ID: {invite.usedBy} pe {format(invite.createdAt, "PPP", { locale: ro })}</p>
                            </div>
                            <Badge variant="secondary">Folosit</Badge>
                        </div>
                    ))}
                     {usedInvites.length === 0 && (
                        <div className="text-center text-muted-foreground py-4">
                            <p>Nicio invitație folosită încă.</p>
                        </div>
                     )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
