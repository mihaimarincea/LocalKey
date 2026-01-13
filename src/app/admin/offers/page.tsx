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
import { collection } from "firebase/firestore"
import type { Offer } from "@/types"
import { Skeleton } from "@/components/ui/skeleton"
import { useLanguage } from "@/contexts/language-context"

export default function AdminOffersPage() {
  const firestore = useFirestore();
  const { t, language } = useLanguage();
  const offersRef = useMemoFirebase(() => collection(firestore, "offers"), [firestore]);
  const { data: offers, isLoading } = useCollection<Offer>(offersRef);
  const locale = language === 'ro' ? ro : enUS;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{t('adminLayout.offers.title')}</CardTitle>
          <CardDescription>
            {t('adminLayout.offers.subtitle')}
          </CardDescription>
        </div>
        <Button size="sm" className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            {t('adminLayout.offers.add')}
          </span>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('status')}</TableHead>
              <TableHead>{t('adminLayout.offers.offerTitle')}</TableHead>
              <TableHead className="hidden md:table-cell">{t('adminLayout.offers.partner')}</TableHead>
              <TableHead className="hidden md:table-cell">{t('adminLayout.offers.expiresAt')}</TableHead>
              <TableHead>
                <span className="sr-only">{t('actions')}</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && Array.from({ length: 5 }).map((_, i) => (
                <OfferTableRowSkeleton key={i} />
            ))}
            {offers?.map(offer => {
              const expiresAtDate = offer.expiresAt instanceof Date ? offer.expiresAt : (offer.expiresAt as any).toDate();
              return (
              <TableRow key={offer.id}>
                <TableCell>
                  <Badge variant={offer.isPaused ? "secondary" : "default"}>
                    {offer.isPaused ? t('adminLayout.offers.statusPaused') : t('adminLayout.offers.statusActive')}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{offer.title}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {offer.partnerName}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {format(expiresAtDate, "PPP", { locale })}
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
                      <DropdownMenuItem>{t('adminLayout.offers.edit')}</DropdownMenuItem>
                      <DropdownMenuItem>{t('adminLayout.offers.viewDetails')}</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        {t('adminLayout.offers.delete')}
                      </DropdownMenuItem>
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

const OfferTableRowSkeleton = () => (
    <TableRow>
        <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
        <TableCell><Skeleton className="h-4 w-48" /></TableCell>
        <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-32" /></TableCell>
        <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-24" /></TableCell>
        <TableCell><Skeleton className="h-8 w-8" /></TableCell>
    </TableRow>
)
