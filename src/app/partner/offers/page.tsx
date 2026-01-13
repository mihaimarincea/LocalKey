
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
import { mockOffers } from "@/lib/data"
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
import { useLanguage } from "@/contexts/language-context"

export default function PartnerOffersPage() {
  const { t, language } = useLanguage();
  const locale = language === 'ro' ? ro : enUS;
  // In a real app, filter for the current partner's offers
  const partnerOffers = mockOffers.filter(o => o.partnerId === 'partner-001' || o.partnerId === 'partner-004');

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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('status')}</TableHead>
              <TableHead>{t('partnerLayout.offers.offer')}</TableHead>
              <TableHead className="hidden md:table-cell">{t('partnerLayout.offers.category')}</TableHead>
              <TableHead className="hidden md:table-cell">{t('partnerLayout.offers.expiresAt')}</TableHead>
              <TableHead>
                <span className="sr-only">{t('actions')}</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {partnerOffers.map(offer => (
              <TableRow key={offer.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch id={`status-${offer.id}`} checked={!offer.isPaused} aria-label={t('partnerLayout.offers.toggleStatus')} />
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
                  {format(offer.expiresAt as Date, "PPP", { locale })}
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
                      <DropdownMenuItem>{t('partnerLayout.offers.edit')}</DropdownMenuItem>
                      <DropdownMenuItem>{t('partnerLayout.offers.viewStats')}</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        {t('partnerLayout.offers.delete')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
