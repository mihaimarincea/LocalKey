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
import { MoreHorizontal, PlusCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function PartnerOffersPage() {
  // In a real app, filter for the current partner's offers
  const partnerOffers = mockOffers.filter(o => o.partnerId === 'partner-001' || o.partnerId === 'partner-004');

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Your Offers</CardTitle>
          <CardDescription>
            Manage your active and paused offers.
          </CardDescription>
        </div>
        <Button size="sm" className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Offer
          </span>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Offer</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead className="hidden md:table-cell">Expires</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {partnerOffers.map(offer => (
              <TableRow key={offer.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch id={`status-${offer.id}`} checked={!offer.isPaused} aria-label="Toggle offer status" />
                     <Badge variant={offer.isPaused ? "secondary" : "default"}>
                        {offer.isPaused ? "Paused" : "Active"}
                     </Badge>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{offer.title}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {offer.category}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {format(offer.expiresAt, "PPP")}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>View Stats</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete
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
