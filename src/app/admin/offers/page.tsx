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
import { ro } from "date-fns/locale"
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

export default function AdminOffersPage() {
  const firestore = useFirestore();
  const offersRef = useMemoFirebase(() => collection(firestore, "offers"), [firestore]);
  const { data: offers, isLoading } = useCollection<Offer>(offersRef);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Oferte</CardTitle>
          <CardDescription>
            Gestionează toate ofertele de pe platformă.
          </CardDescription>
        </div>
        <Button size="sm" className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Adaugă Ofertă
          </span>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Stare</TableHead>
              <TableHead>Titlu Ofertă</TableHead>
              <TableHead className="hidden md:table-cell">Partener</TableHead>
              <TableHead className="hidden md:table-cell">Expiră la</TableHead>
              <TableHead>
                <span className="sr-only">Acțiuni</span>
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
                    {offer.isPaused ? "Pauză" : "Activă"}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{offer.title}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {offer.partnerName}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {format(expiresAtDate, "PPP", { locale: ro })}
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
                      <DropdownMenuLabel>Acțiuni</DropdownMenuLabel>
                      <DropdownMenuItem>Editează</DropdownMenuItem>
                      <DropdownMenuItem>Vezi Detalii</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Șterge
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
