import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { StatsChart } from "@/components/dashboard/stats-chart"
import { DollarSign, Gift, Users } from "lucide-react"

export default function PartnerDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Partner Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back, The Daily Grind!</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Redemptions
            </CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,254</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Estimated Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,821.50</div>
            <p className="text-xs text-muted-foreground">
              +18.3% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+235</div>
            <p className="text-xs text-muted-foreground">
              +32.7% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
        <StatsChart />
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>A log of the latest offer redemptions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center">
                    <Users className="h-6 w-6 mr-4 text-muted-foreground"/>
                    <div className="flex-grow">
                        <p className="text-sm font-medium">Offer 'Free Croissant' redeemed.</p>
                        <p className="text-xs text-muted-foreground">User ID: user-001</p>
                    </div>
                    <div className="text-xs text-muted-foreground">2m ago</div>
                </div>
                 <div className="flex items-center">
                    <Users className="h-6 w-6 mr-4 text-muted-foreground"/>
                    <div className="flex-grow">
                        <p className="text-sm font-medium">Offer 'Free Croissant' redeemed.</p>
                        <p className="text-xs text-muted-foreground">User ID: user-003</p>
                    </div>
                    <div className="text-xs text-muted-foreground">1h ago</div>
                </div>
                 <div className="flex items-center">
                    <Users className="h-6 w-6 mr-4 text-muted-foreground"/>
                    <div className="flex-grow">
                        <p className="text-sm font-medium">Offer 'Free Croissant' redeemed.</p>
                        <p className="text-xs text-muted-foreground">User ID: user-002</p>
                    </div>
                    <div className="text-xs text-muted-foreground">3h ago</div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
