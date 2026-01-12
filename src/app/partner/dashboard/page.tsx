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
        <h1 className="text-3xl font-bold tracking-tight">Panou Partener</h1>
        <p className="text-muted-foreground mt-1">Bun venit înapoi, The Daily Grind!</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Răscumpărări Totale
            </CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,254</div>
            <p className="text-xs text-muted-foreground">
              +20.1% față de luna trecută
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Venit Estimat
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,821.50</div>
            <p className="text-xs text-muted-foreground">
              +18.3% față de luna trecută
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clienți Noi</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+235</div>
            <p className="text-xs text-muted-foreground">
              +32.7% față de luna trecută
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
        <StatsChart />
        <Card>
            <CardHeader>
                <CardTitle>Activitate Recentă</CardTitle>
                <CardDescription>Un jurnal al ultimelor răscumpărări de oferte.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center">
                    <Users className="h-6 w-6 mr-4 text-muted-foreground"/>
                    <div className="flex-grow">
                        <p className="text-sm font-medium">Oferta 'Croissant Gratuit' răscumpărată.</p>
                        <p className="text-xs text-muted-foreground">ID Utilizator: user-001</p>
                    </div>
                    <div className="text-xs text-muted-foreground">acum 2m</div>
                </div>
                 <div className="flex items-center">
                    <Users className="h-6 w-6 mr-4 text-muted-foreground"/>
                    <div className="flex-grow">
                        <p className="text-sm font-medium">Oferta 'Croissant Gratuit' răscumpărată.</p>
                        <p className="text-xs text-muted-foreground">ID Utilizator: user-003</p>
                    </div>
                    <div className="text-xs text-muted-foreground">acum 1h</div>
                </div>
                 <div className="flex items-center">
                    <Users className="h-6 w-6 mr-4 text-muted-foreground"/>
                    <div className="flex-grow">
                        <p className="text-sm font-medium">Oferta 'Croissant Gratuit' răscumpărată.</p>
                        <p className="text-xs text-muted-foreground">ID Utilizator: user-002</p>
                    </div>
                    <div className="text-xs text-muted-foreground">acum 3h</div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
