
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
import { mockInvites } from "@/lib/data"
import { MoreHorizontal, PlusCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/contexts/language-context"

export default function AdminInvitesPage() {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{t('adminLayout.invites.title')}</CardTitle>
          <CardDescription>
            {t('adminLayout.invites.subtitle')}
          </CardDescription>
        </div>
        <Button size="sm" className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            {t('adminLayout.invites.generate')}
          </span>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('adminLayout.invites.code')}</TableHead>
              <TableHead>{t('status')}</TableHead>
              <TableHead className="hidden md:table-cell">{t('adminLayout.invites.invitedBy')}</TableHead>
              <TableHead className="hidden md:table-cell">{t('adminLayout.invites.usedBy')}</TableHead>
              <TableHead>
                <span className="sr-only">{t('actions')}</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockInvites.map(invite => (
              <TableRow key={invite.code}>
                <TableCell className="font-mono">{invite.code}</TableCell>
                <TableCell>
                  <Badge variant={invite.status === 'used' ? "secondary" : "default"}>
                    {invite.status === 'used' ? t('adminLayout.invites.statusUsed') : t('adminLayout.invites.statusAvailable')}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {invite.invitedBy}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {invite.usedBy || "N/A"}
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
                      <DropdownMenuItem>{t('adminLayout.invites.viewDetails')}</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        {t('adminLayout.invites.revoke')}
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
