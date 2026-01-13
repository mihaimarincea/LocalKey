'use client';
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { ro, enUS } from "date-fns/locale"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Offer } from "@/types"
import { Clock } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

interface OfferCardProps {
  offer: Offer
}

export function OfferCard({ offer }: OfferCardProps) {
    const { language, t } = useLanguage();
    const locale = language === 'ro' ? ro : enUS;
    const expiresAtDate = (offer.expiresAt as any).toDate();
  return (
    <Card className="flex flex-col overflow-hidden h-full">
      <CardHeader className="p-0">
        <div className="relative">
          <Image
            alt={offer.title}
            className="aspect-[3/2] w-full object-cover"
            height={400}
            src={offer.imageUrl}
            width={600}
            data-ai-hint="food drink"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Badge variant="outline" className="mb-2">{offer.category}</Badge>
        <CardTitle className="text-xl font-bold leading-tight mb-2">{offer.title}</CardTitle>
        <CardDescription>{offer.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4 p-4 pt-0">
        <div className="flex items-center w-full">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={offer.partnerLogoUrl} alt={offer.partnerName} />
            <AvatarFallback>{offer.partnerName.substring(0,2)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-muted-foreground">{offer.partnerName}</span>
        </div>
        <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>Expiră {formatDistanceToNow(expiresAtDate, { addSuffix: true, locale })}</span>
            </div>
            <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
                <Link href="/dashboard/qr">{t('dashboardUser.qr.title')}</Link>
            </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
