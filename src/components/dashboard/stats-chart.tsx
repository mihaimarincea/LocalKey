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

const chartData = [
  { month: "January", redemptions: 186 },
  { month: "February", redemptions: 305 },
  { month: "March", redemptions: 237 },
  { month: "April", redemptions: 273 },
  { month: "May", redemptions: 209 },
  { month: "June", redemptions: 214 },
]

const chartConfig = {
  redemptions: {
    label: "Redemptions",
    color: "hsl(var(--primary))",
  },
}

export function StatsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Redemptions Overview</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
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
