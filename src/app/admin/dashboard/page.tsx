
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { StatsChart } from "@/components/dashboard/stats-chart"
import { FraudAlertGenerator } from "@/components/admin/fraud-alert-generator"
import { DollarSign, Gift, Users, Building } from "lucide-react"
import { useLanguage } from "@/contexts/language-context";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, collectionGroup, query } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboardPage() {
  const { t } = useLanguage();
  const firestore = useFirestore();

  const usersQuery = useMemoFirebase(() => firestore ? query(collection(firestore, "users")) : null, [firestore]);
  const partnersQuery = useMemoFirebase(() => firestore ? query(collection(firestore, "partners")) : null, [firestore]);
  const redemptionsQuery = useMemoFirebase(() => firestore ? query(collectionGroup(firestore, "redemptions")) : null, [firestore]);

  const { data: users, isLoading: usersLoading } = useCollection(usersQuery);
  const { data: partners, isLoading: partnersLoading } = useCollection(partnersQuery);
  const { data: redemptions, isLoading: redemptionsLoading } = useCollection(redemptionsQuery);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">{t('adminLayout.dashboard.title')}</h1>
        <p className="text-muted-foreground mt-1">{t('adminLayout.dashboard.subtitle')}</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('adminLayout.dashboard.totalRevenue')}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {/* Placeholder - Revenue data is not tracked yet */}
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% {t('adminLayout.dashboard.fromLastMonth')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('adminLayout.dashboard.totalUsers')}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {usersLoading ? <Skeleton className="h-8 w-20" /> : <div className="text-2xl font-bold">{users?.length ?? 0}</div>}
            <p className="text-xs text-muted-foreground">
              Utilizatori înregistrați pe platformă
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('adminLayout.dashboard.totalPartners')}</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {partnersLoading ? <Skeleton className="h-8 w-16" /> : <div className="text-2xl font-bold">{partners?.length ?? 0}</div>}
            <p className="text-xs text-muted-foreground">
              Parteneri activi
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('adminLayout.dashboard.totalRedemptions')}
            </CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {redemptionsLoading ? <Skeleton className="h-8 w-24" /> : <div className="text-2xl font-bold">{redemptions?.length ?? 0}</div>}
            <p className="text-xs text-muted-foreground">
             Oferte răscumpărate în total
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
        <StatsChart />
        <FraudAlertGenerator />
      </div>
    </div>
  )
}
