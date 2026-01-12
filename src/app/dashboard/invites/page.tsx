import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockInvites, mockUsers } from "@/lib/data";
import { Copy, Gift } from "lucide-react";
import { format } from "date-fns";

export default function InvitesPage() {
    // In a real app, this would be the logged-in user
    const currentUser = mockUsers.find(u => u.role === 'user');
    const userInvites = mockInvites.filter(inv => inv.invitedBy === currentUser?.id);

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold tracking-tight">Your Invitations</h1>
                <p className="text-muted-foreground mt-1">Invite friends to join LOCALKEY and unlock rewards.</p>
            </header>
            
            <Card>
                <CardHeader>
                    <CardTitle>Available Codes</CardTitle>
                    <CardDescription>You have {userInvites.filter(i => i.status === 'available').length} invites remaining.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {userInvites.filter(i => i.status === 'available').map(invite => (
                        <div key={invite.code} className="flex items-center justify-between p-4 rounded-lg border bg-secondary/50">
                            <div className="flex items-center gap-4">
                                <Gift className="h-6 w-6 text-primary" />
                                <span className="font-mono text-lg font-medium">{invite.code}</span>
                            </div>
                            <Button size="sm" variant="outline">
                                <Copy className="mr-2 h-4 w-4" />
                                Copy Code
                            </Button>
                        </div>
                    ))}
                     {userInvites.filter(i => i.status === 'available').length === 0 && (
                        <div className="text-center text-muted-foreground py-8">
                            <p>No available invites at the moment.</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Invite History</CardTitle>
                    <CardDescription>See the status of invites you've sent.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                    {userInvites.filter(i => i.status === 'used').map(invite => (
                        <div key={invite.code} className="flex items-center justify-between p-3 rounded-md border">
                            <div>
                                <p className="font-mono">{invite.code}</p>
                                <p className="text-sm text-muted-foreground">Used by User ID: {invite.usedBy} on {format(invite.createdAt, "PPP")}</p>
                            </div>
                            <Badge variant="secondary">Used</Badge>
                        </div>
                    ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
