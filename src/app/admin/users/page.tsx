'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle, Search, Users, UserCheck, UserX } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function AdminUsersPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-6">
       <CardHeader className="p-0">
          <CardTitle>{t('adminLayout.users.title')}</CardTitle>
          <CardDescription>
            {t('adminLayout.users.subtitle')}
          </CardDescription>
        </CardHeader>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-xs text-muted-foreground">+180 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Partners</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">57</div>
            <p className="text-xs text-muted-foreground">+5 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspended Users</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
             <p className="text-xs text-muted-foreground">2 new suspensions</p>
          </CardContent>
        </Card>
      </div>

      {/* Management Actions */}
      <Card>
        <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
                Search for a specific user to view details or perform actions.
            </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-grow items-center gap-2">
                <Input placeholder="Search by email or user ID..." className="max-w-md"/>
                <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                </Button>
            </div>
             <Button size="sm" className="gap-1 w-full md:w-auto">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    {t('adminLayout.users.add')}
                </span>
            </Button>
        </CardContent>
         <CardContent>
            <div className="text-center text-muted-foreground py-8 border-2 border-dashed rounded-lg">
                <p>Search results will appear here.</p>
            </div>
         </CardContent>
      </Card>
    </div>
  )
}
