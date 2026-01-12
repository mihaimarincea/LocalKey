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
import type { Partner } from "@/types"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminPartnersPage() {
  const firestore = useFirestore();
  const partnersRef = useMemoFirebase(() => collection(firestore, "partners"), [firestore]);
  const { data: partners, isLoading } = useCollection<Partner>(partnersRef);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Parteneri</CardTitle>
          <CardDescription>
            Gestionează toți partenerii de pe platformă.
          </CardDescription>
        </div>
        <Button size="sm" className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Adaugă Partener
          </span>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nume</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden md:table-cell">
                Oferte
              </TableHead>
              <TableHead className="hidden md:table-cell">
                Răscumpărări
              </TableHead>
              <TableHead className="hidden md:table-cell">
                Data Aderării
              </TableHead>
              <TableHead>
                <span className="sr-only">Acțiuni</span>
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
                <TableCell className="font-medium">{partner.name}</TableCell>
                <TableCell>{partner.email}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {partner.offerCount}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {partner.totalRedemptions.toLocaleString()}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {format(createdAtDate, "PPP", { locale: ro })}
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
                      <DropdownMenuItem>Vezi Panou</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Dezactivează
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

const PartnerTableRowSkeleton = () => (
    <TableRow>
        <TableCell><Skeleton className="h-4 w-32" /></TableCell>
        <TableCell><Skeleton className="h-4 w-40" /></TableCell>
        <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-8" /></TableCell>
        <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-12" /></TableCell>
        <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-24" /></TableCell>
        <TableCell><Skeleton className="h-8 w-8" /></TableCell>
    </TableRow>
)
