
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { StatsChart } from "@/components/dashboard/stats-chart"
import { DollarSign, Gift, Users } from "lucide-react"
import { useLanguage } from "@/contexts/language-context";

export default function PartnerDashboardPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">{t('partnerLayout.dashboard.title')}</h1>
        <p className="text-muted-foreground mt-1">{t('partnerLayout.dashboard.welcome', { partnerName: 'The Daily Grind' })}</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('partnerLayout.dashboard.totalRedemptions')}
            </CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,254</div>
            <p className="text-xs text-muted-foreground">
              +20.1% {t('partnerLayout.dashboard.fromLastMonth')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('partnerLayout.dashboard.estimatedRevenue')}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,821.50</div>
            <p className="text-xs text-muted-foreground">
              +18.3% {t('partnerLayout.dashboard.fromLastMonth')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('partnerLayout.dashboard.newCustomers')}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+235</div>
            <p className="text-xs text-muted-foreground">
              +32.7% {t('partnerLayout.dashboard.fromLastMonth')}
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
        <StatsChart />
        <Card>
            <CardHeader>
                <CardTitle>{t('partnerLayout.dashboard.recentActivity')}</CardTitle>
                <CardDescription>{t('partnerLayout.dashboard.recentActivitySubtitle')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center">
                    <Users className="h-6 w-6 mr-4 text-muted-foreground"/>
                    <div className="flex-grow">
                        <p className="text-sm font-medium">{t('partnerLayout.dashboard.offerRedeemed', { offerName: 'Croissant Gratuit' })}</p>
                        <p className="text-xs text-muted-foreground">{t('partnerLayout.dashboard.userId', { userId: 'user-001' })}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">{t('partnerLayout.dashboard.timeAgo', { time: '2m' })}</div>
                </div>
                 <div className="flex items-center">
                    <Users className="h-6 w-6 mr-4 text-muted-foreground"/>
                    <div className="flex-grow">
                        <p className="text-sm font-medium">{t('partnerLayout.dashboard.offerRedeemed', { offerName: 'Croissant Gratuit' })}</p>
                        <p className="text-xs text-muted-foreground">{t('partnerLayout.dashboard.userId', { userId: 'user-003' })}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">{t('partnerLayout.dashboard.timeAgo', { time: '1h' })}</div>
                </div>
                 <div className="flex items-center">
                    <Users className="h-6 w-6 mr-4 text-muted-foreground"/>
                    <div className="flex-grow">
                        <p className="text-sm font-medium">{t('partnerLayout.dashboard.offerRedeemed', { offerName: 'Croissant Gratuit' })}</p>
                        <p className="text-xs text-muted-foreground">{t('partnerLayout.dashboard.userId', { userId: 'user-002' })}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">{t('partnerLayout.dashboard.timeAgo', { time: '3h' })}</div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
