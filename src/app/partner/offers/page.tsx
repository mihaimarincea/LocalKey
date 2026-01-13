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
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { format } from "date-fns"
import { ro, enUS } from "date-fns/locale"
import { MoreHorizontal, PlusCircle, Pencil, Trash2 } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useCollection, useFirestore, useUser, useMemoFirebase } from "@/firebase";
import { collection, query, where, doc, updateDoc, deleteDoc } from "firebase/firestore";
import type { Offer } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";


export default function PartnerOffersPage() {
  const { t, language } = useLanguage();
  const locale = language === 'ro' ? ro : enUS;
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const partnerOffersQuery = useMemoFirebase(
    () => user ? query(collection(firestore, 'offers'), where("partnerId", "==", user.uid)) : null,
    [user, firestore]
  );
  const { data: offers, isLoading } = useCollection<Offer>(partnerOffersQuery);

  const handleStatusToggle = async (offerId: string, currentStatus: boolean) => {
    if (!firestore) return;
    const offerRef = doc(firestore, 'offers', offerId);
    try {
        await updateDoc(offerRef, { isPaused: !currentStatus });
        toast({
            title: t('partnerLayout.offers.statusUpdated'),
            description: t('partnerLayout.offers.statusUpdatedSubtitle')
        })
    } catch(error) {
        console.error("Error updating offer status", error);
        toast({
            variant: "destructive",
            title: t('toast.errorTitle'),
            description: t('toast.errorDescription'),
        })
    }
  }

  const handleDeleteOffer = async (offerId: string) => {
    if (!firestore) return;
    const offerRef = doc(firestore, 'offers', offerId);
    try {
        await deleteDoc(offerRef);
        toast({
            title: t('partnerLayout.offers.offerDeleted'),
        })
    } catch(error) {
        console.error("Error deleting offer", error);
        toast({
            variant: "destructive",
            title: t('toast.errorTitle'),
            description: t('toast.errorDescription'),
        })
    }
  }


  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{t('partnerLayout.offers.title')}</CardTitle>
          <CardDescription>
            {t('partnerLayout.offers.subtitle')}
          </CardDescription>
        </div>
        <Button size="sm" className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            {t('partnerLayout.offers.add')}
          </span>
        </Button>
      </CardHeader>
      <CardContent>
      <TooltipProvider>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('status')}</TableHead>
              <TableHead>{t('partnerLayout.offers.offer')}</TableHead>
              <TableHead className="hidden md:table-cell">{t('partnerLayout.offers.category')}</TableHead>
              <TableHead className="hidden md:table-cell">{t('partnerLayout.offers.expiresAt')}</TableHead>
              <TableHead className="text-right">
                <span>{t('actions')}</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && Array.from({length: 3}).map((_, i) => <OfferTableRowSkeleton key={i} />)}

            {offers?.map(offer => {
              const expiresAtDate = (offer.expiresAt as any).toDate();
              return (
              <TableRow key={offer.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Switch 
                                id={`status-${offer.id}`} 
                                checked={!offer.isPaused} 
                                onCheckedChange={() => handleStatusToggle(offer.id, offer.isPaused)}
                                aria-label={t('partnerLayout.offers.toggleStatus')} 
                            />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{t('partnerLayout.offers.toggleStatus')}</p>
                        </TooltipContent>
                    </Tooltip>
                     <Badge variant={offer.isPaused ? "secondary" : "default"}>
                        {offer.isPaused ? t('partnerLayout.offers.statusPaused') : t('partnerLayout.offers.statusActive')}
                     </Badge>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{offer.title}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {offer.category}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {format(expiresAtDate, "PPP", { locale })}
                </TableCell>
                <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                         <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Pencil className="h-4 w-4" />
                                    <span className="sr-only">{t('partnerLayout.offers.edit')}</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent><p>{t('partnerLayout.offers.edit')}</p></TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteOffer(offer.id)}>
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                    <span className="sr-only">{t('partnerLayout.offers.delete')}</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent><p>{t('partnerLayout.offers.delete')}</p></TooltipContent>
                        </Tooltip>
                    </div>
                </TableCell>
              </TableRow>
            )})}
             {!isLoading && offers?.length === 0 && (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                        {t('partnerLayout.offers.noOffers')}
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
        </TooltipProvider>
      </CardContent>
    </Card>
  )
}

const OfferTableRowSkeleton = () => (
    <TableRow>
        <TableCell><div className="flex items-center gap-2"><Skeleton className="h-6 w-11 rounded-full" /><Skeleton className="h-6 w-20 rounded-full" /></div></TableCell>
        <TableCell><Skeleton className="h-4 w-48" /></TableCell>
        <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-24" /></TableCell>
        <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-32" /></TableCell>
        <TableCell className="text-right"><div className="flex items-center justify-end gap-2"><Skeleton className="h-8 w-8" /><Skeleton className="h-8 w-8" /></div></TableCell>
    </TableRow>
)
