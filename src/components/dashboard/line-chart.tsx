"use client"

import React, { useEffect, useState } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ChartDataPoint {
  date: string
  value: number
  displayDate: string
}

interface LineChartProps {
  data: ChartDataPoint[]
  title: string
  subtitle: string
  trendPercentage: number
  selectedKpi: string
}

// Generate realistic data for the chart based on KPI type
const generateChartData = (period: string, kpiId: string = "total-calls") => {
  const data = []
  const now = new Date()
  let days = 30

  if (period === "last-day") {
    days = 1
  } else if (period === "last-week") {
    days = 7
  }

  // Define base values and trends for each KPI
  const kpiConfig: Record<string, { baseValue: number; trend: 'up' | 'down' | 'stable'; variance: number }> = {
    "total-calls": { baseValue: 4, trend: 'up', variance: 2 },
    "appointment-requests": { baseValue: 1, trend: 'up', variance: 1 },
    "appointment-confirmations": { baseValue: 1, trend: 'up', variance: 1 },
    "hangups": { baseValue: 1, trend: 'down', variance: 0.5 },
    "transfer-to-human": { baseValue: 0.5, trend: 'stable', variance: 0.3 },
    "pricing-inquiries": { baseValue: 1, trend: 'stable', variance: 0.5 },
    "vehicle-status": { baseValue: 2, trend: 'up', variance: 1 },
    "returning-call": { baseValue: 0.3, trend: 'stable', variance: 0.2 },
    "took-message": { baseValue: 0.5, trend: 'stable', variance: 0.3 },
    "cancelled-appointments": { baseValue: 0.2, trend: 'down', variance: 0.2 }
  }

  const config = kpiConfig[kpiId] || kpiConfig["total-calls"]

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    
    // Calculate trend factor
    let trendFactor = 1
    if (config.trend === 'up') {
      trendFactor = 1 + (i * 0.02) // Slight upward trend
    } else if (config.trend === 'down') {
      trendFactor = 1 - (i * 0.02) // Slight downward trend
    }
    
    // Add some randomness
    const randomFactor = 1 + (Math.random() - 0.5) * config.variance
    const value = Math.max(0, Math.round(config.baseValue * trendFactor * randomFactor))
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: value,
      displayDate: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      })
    })
  }

  return data
}

// Get trend information for a specific KPI
const getTrendInfo = (kpiId: string) => {
  const trendConfig: Record<string, { direction: 'up' | 'down' | 'stable'; percentage: number; isPositive: boolean }> = {
    "total-calls": { direction: 'up', percentage: 12, isPositive: true },
    "appointment-requests": { direction: 'up', percentage: 8, isPositive: true },
    "appointment-confirmations": { direction: 'up', percentage: 15, isPositive: true },
    "hangups": { direction: 'down', percentage: 18, isPositive: true }, // Downward trend is positive for hangups
    "transfer-to-human": { direction: 'stable', percentage: 2, isPositive: true },
    "pricing-inquiries": { direction: 'stable', percentage: 3, isPositive: true },
    "vehicle-status": { direction: 'up', percentage: 22, isPositive: true },
    "returning-call": { direction: 'stable', percentage: 1, isPositive: true },
    "took-message": { direction: 'stable', percentage: 4, isPositive: true },
    "cancelled-appointments": { direction: 'down', percentage: 25, isPositive: true } // Downward trend is positive for cancellations
  }
  
  return trendConfig[kpiId] || trendConfig["total-calls"]
}

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: ChartDataPoint }> }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="rounded-lg border bg-white p-2 shadow-lg">
        <p className="text-xs font-medium text-zinc-950">
          {new Date(data.date).toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric',
            year: 'numeric'
          })}
        </p>
        <p className="text-xs text-zinc-600">
          Total calls: {data.value}
        </p>
      </div>
    )
  }
  return null
}

export default function DashboardLineChart({ 
  data, 
  title, 
  subtitle, 
  trendPercentage,
  selectedKpi
}: LineChartProps) {
  const [displayData, setDisplayData] = useState(data)
  const [isAnimating, setIsAnimating] = useState(false)
  
  const trendInfo = getTrendInfo(selectedKpi)

  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => {
      setDisplayData(data)
      setIsAnimating(false)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [selectedKpi, data])

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold text-zinc-950 transition-all duration-300">
            {title}
          </CardTitle>
          <p className="text-sm text-zinc-500 transition-all duration-300">
            {subtitle}
          </p>
        </div>
        <div className={`flex items-center gap-2 rounded-full px-2 py-1 ${
          selectedKpi === 'hangups' || selectedKpi === 'cancelled-appointments'
            ? 'bg-red-50'
            : trendInfo.direction === 'up'
            ? 'bg-green-50'
            : 'bg-gray-50'
        }`}>
          {trendInfo.direction === 'down' ? (
            <TrendingDown className={`h-4 w-4 ${
              selectedKpi === 'hangups' || selectedKpi === 'cancelled-appointments'
                ? 'text-red-600'
                : 'text-red-600'
            }`} />
          ) : (
            <TrendingUp className={`h-4 w-4 ${
              trendInfo.direction === 'up' ? 'text-green-600' : 'text-gray-600'
            }`} />
          )}
          <span className={`text-sm font-medium ${
            selectedKpi === 'hangups' || selectedKpi === 'cancelled-appointments'
              ? 'text-red-600'
              : trendInfo.direction === 'up'
              ? 'text-green-600'
              : 'text-gray-600'
          }`}>
            {trendInfo.direction === 'down' 
              ? `Trending down by ${trendInfo.percentage}% this month`
              : trendInfo.direction === 'up'
              ? `Trending up by ${trendInfo.percentage}% this month`
              : `Stable at ${trendInfo.percentage}% this month`
            }
          </span>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="h-[240px] w-full -mx-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={displayData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="displayDate" 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#0e7169"
                strokeWidth={2}
                dot={{ 
                  fill: "#0e7169", 
                  strokeWidth: 2, 
                  r: 4 
                }}
                activeDot={{ 
                  r: 6, 
                  stroke: "#0e7169", 
                  strokeWidth: 2 
                }}
                animationDuration={800}
                animationEasing="ease-out"
                isAnimationActive={!isAnimating}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export { generateChartData }
