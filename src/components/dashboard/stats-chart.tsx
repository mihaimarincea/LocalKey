"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useLanguage } from "@/contexts/language-context"

export function StatsChart() {
  const { t } = useLanguage();

  const chartData = [
    { month: t('adminLayout.charts.months.january'), redemptions: 186 },
    { month: t('adminLayout.charts.months.february'), redemptions: 305 },
    { month: t('adminLayout.charts.months.march'), redemptions: 237 },
    { month: t('adminLayout.charts.months.april'), redemptions: 273 },
    { month: t('adminLayout.charts.months.may'), redemptions: 209 },
    { month: t('adminLayout.charts.months.june'), redemptions: 214 },
  ]
  
  const chartConfig = {
    redemptions: {
      label: t('adminLayout.charts.redemptionsLabel'),
      color: "hsl(var(--primary))",
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('adminLayout.charts.redemptionsOverview')}</CardTitle>
        <CardDescription>{t('adminLayout.charts.dateRange')}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart data={chartData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="redemptions" fill="var(--color-redemptions)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
