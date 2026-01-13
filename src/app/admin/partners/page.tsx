'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { ro, enUS } from "date-fns/locale"
import { MoreHorizontal, PlusCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase"
import { collection, doc, writeBatch } from "firebase/firestore"
import type { Partner, PartnerStatus } from "@/types"
import { Skeleton } from "@/components/ui/skeleton"
import { useLanguage } from "@/contexts/language-context"
import { useToast } from "@/hooks/use-toast";

export default function AdminPartnersPage() {
  const firestore = useFirestore();
  const { t, language } = useLanguage();
  const partnersRef = useMemoFirebase(() => collection(firestore, "partners"), [firestore]);
  const { data: partners, isLoading } = useCollection<Partner>(partnersRef);
  const locale = language === 'ro' ? ro : enUS;
  const { toast } = useToast();

  const handleUpdateStatus = async (partnerId: string, status: PartnerStatus) => {
    if (!firestore) return;
    const batch = writeBatch(firestore);
    
    const partnerRef = doc(firestore, 'partners', partnerId);
    batch.update(partnerRef, { status });

    if (status === 'approved') {
        const roleRef = doc(firestore, 'roles_partner', partnerId);
        batch.set(roleRef, { role: 'partner' });
    }

    try {
        await batch.commit();
        toast({
            title: "Success",
            description: `Partner status updated to ${status}.`,
        });
    } catch (error) {
        console.error("Error updating partner status:", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to update partner status.",
        });
    }
  };


  const getStatusVariant = (status: PartnerStatus) => {
    switch (status) {
        case 'approved': return 'default';
        case 'pending': return 'secondary';
        case 'rejected': return 'destructive';
        default: return 'outline';
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{t('adminLayout.partners.title')}</CardTitle>
          <CardDescription>
            {t('adminLayout.partners.subtitle')}
          </CardDescription>
        </div>
        <Button size="sm" className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            {t('adminLayout.partners.add')}
          </span>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('adminLayout.partners.name')}</TableHead>
              <TableHead>{t('email')}</TableHead>
              <TableHead>{t('status')}</TableHead>
              <TableHead className="hidden md:table-cell">
                {t('adminLayout.partners.joinedDate')}
              </TableHead>
              <TableHead>
                <span className="sr-only">{t('actions')}</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && Array.from({ length: 4 }).map((_, i) => (
              <PartnerTableRowSkeleton key={i} />
            ))}
            {partners?.map(partner => {
              const createdAtDate = partner.createdAt instanceof Date ? partner.createdAt : (partner.createdAt as any).toDate();
              return (
              <TableRow key={partner.id}>
                <TableCell className="font-medium">{partner.companyName}</TableCell>
                <TableCell>{partner.contactEmail}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(partner.status)}>{partner.status}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {format(createdAtDate, "PPP", { locale })}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Comută meniu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>
                      {partner.status !== 'approved' && 
                        <DropdownMenuItem onClick={() => handleUpdateStatus(partner.id, 'approved')}>
                            Approve
                        </DropdownMenuItem>
                      }
                      {partner.status !== 'rejected' &&
                        <DropdownMenuItem className="text-destructive" onClick={() => handleUpdateStatus(partner.id, 'rejected')}>
                            Reject
                        </DropdownMenuItem>
                      }
                      <DropdownMenuItem>{t('adminLayout.partners.viewDashboard')}</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

const PartnerTableRowSkeleton = () => (
    <TableRow>
        <TableCell><Skeleton className="h-4 w-32" /></TableCell>
        <TableCell><Skeleton className="h-4 w-40" /></TableCell>
        <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
        <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-24" /></TableCell>
        <TableCell><Skeleton className="h-8 w-8" /></TableCell>
    </TableRow>
)
