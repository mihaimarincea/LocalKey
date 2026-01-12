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
  { month: "Ianuarie", redemptions: 186 },
  { month: "Februarie", redemptions: 305 },
  { month: "Martie", redemptions: 237 },
  { month: "Aprilie", redemptions: 273 },
  { month: "Mai", redemptions: 209 },
  { month: "Iunie", redemptions: 214 },
]

const chartConfig = {
  redemptions: {
    label: "Răscumpărări",
    color: "hsl(var(--primary))",
  },
}

export function StatsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Prezentare Generală Răscumpărări</CardTitle>
        <CardDescription>Ianuarie - Iunie 2024</CardDescription>
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
