'use client';
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
import type { User } from "@/types"
import { Skeleton } from "@/components/ui/skeleton"
import { useLanguage } from "@/contexts/language-context"

export default function AdminUsersPage() {
  const firestore = useFirestore();
  const { t, language } = useLanguage();
  const usersRef = useMemoFirebase(() => collection(firestore, "users"), [firestore]);
  const { data: users, isLoading } = useCollection<User>(usersRef);
  const locale = language === 'ro' ? ro : enUS;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{t('adminLayout.users.title')}</CardTitle>
          <CardDescription>
            {t('adminLayout.users.subtitle')}
          </CardDescription>
        </div>
        <Button size="sm" className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            {t('adminLayout.users.add')}
          </span>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">{t('adminLayout.users.image')}</span>
              </TableHead>
              <TableHead>{t('adminLayout.users.nameEmail')}</TableHead>
              <TableHead>{t('adminLayout.users.role')}</TableHead>
              <TableHead className="hidden md:table-cell">
                {t('adminLayout.users.invites')}
              </TableHead>
              <TableHead className="hidden md:table-cell">
                {t('adminLayout.users.createdAt')}
              </TableHead>
              <TableHead>
                <span className="sr-only">{t('actions')}</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && Array.from({ length: 5 }).map((_, i) => (
              <UserTableRowSkeleton key={i} />
            ))}
            {users?.map(user => {
              const createdAtDate = user.createdAt instanceof Date ? user.createdAt : (user.createdAt as any).toDate();
              return (
                <TableRow key={user.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Avatar utilizator"
                      className="aspect-square rounded-full object-cover"
                      height="64"
                      src={user.avatarUrl || `https://avatar.vercel.sh/${user.email}.png`}
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{user.name || user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.role}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {user.inviteCodeCount || 0}
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
                        <DropdownMenuItem>{t('adminLayout.users.edit')}</DropdownMenuItem>
                        <DropdownMenuItem>{t('adminLayout.users.viewDetails')}</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          {t('adminLayout.users.suspend')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

const UserTableRowSkeleton = () => (
    <TableRow>
        <TableCell className="hidden sm:table-cell">
            <Skeleton className="h-16 w-16 rounded-full" />
        </TableCell>
        <TableCell>
            <Skeleton className="h-4 w-32" />
        </TableCell>
        <TableCell>
            <Skeleton className="h-6 w-16 rounded-full" />
        </TableCell>
        <TableCell className="hidden md:table-cell">
            <Skeleton className="h-4 w-8" />
        </TableCell>
        <TableCell className="hidden md:table-cell">
            <Skeleton className="h-4 w-24" />
        </TableCell>
        <TableCell>
            <Skeleton className="h-8 w-8" />
        </TableCell>
    </TableRow>
)
