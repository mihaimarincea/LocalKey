import Image from "next/image"
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
import { mockUsers } from "@/lib/data"
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

export default function AdminUsersPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Utilizatori</CardTitle>
          <CardDescription>
            Gestionează toți utilizatorii de pe platformă.
          </CardDescription>
        </div>
        <Button size="sm" className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Adaugă Utilizator
          </span>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Imagine</span>
              </TableHead>
              <TableHead>Nume</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead className="hidden md:table-cell">
                Invitații
              </TableHead>
              <TableHead className="hidden md:table-cell">
                Creat la
              </TableHead>
              <TableHead>
                <span className="sr-only">Acțiuni</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUsers.map(user => (
              <TableRow key={user.id}>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt="Avatar utilizator"
                    className="aspect-square rounded-full object-cover"
                    height="64"
                    src={user.avatarUrl}
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{user.role}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {user.inviteCodeCount}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {format(user.createdAt, "PPP", { locale: ro })}
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
                        Suspendă
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
