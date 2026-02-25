"use client"

import { useState, useEffect } from "react"
import Sidebar from "./sidebar"
import KpiCards from "./kpi-cards"
import TimeFilter from "./time-filter"
import DashboardLineChart, { generateChartData } from "./line-chart"
import CallsTable from "./calls-table"

interface DashboardProps {
  className?: string
}

export default function Dashboard({ className }: DashboardProps) {
  const [selectedKpi, setSelectedKpi] = useState("total-calls")
  const [selectedPeriod, setSelectedPeriod] = useState("last-month")
  const [chartData, setChartData] = useState<Array<{ date: string; value: number; displayDate: string }>>([])

  useEffect(() => {
    const data = generateChartData(selectedPeriod, selectedKpi)
    setChartData(data)
  }, [selectedPeriod, selectedKpi])

  const getKpiTitle = (kpiId: string) => {
    const kpiMap: Record<string, string> = {
      "total-calls": "Total Calls: 127",
      "appointment-requests": "Appointment Requests: 23",
      "appointment-confirmations": "Appointment Confirmations: 18",
      "hangups": "Hangups: 12",
      "transfer-to-human": "Transfer to Human: 8",
      "pricing-inquiries": "Pricing Inquiries: 15",
      "vehicle-status": "Vehicle Status: 31",
      "returning-call": "Returning a Call: 6",
      "took-message": "Took Message: 9",
      "cancelled-appointments": "Cancelled Appointments: 4"
    }
    return kpiMap[kpiId] || "Total Calls: 127"
  }

  const getKpiSubtitle = (period: string) => {
    const periodMap: Record<string, string> = {
      "last-day": "Total for today",
      "last-week": "Total for the last week",
      "last-month": "Total for the last month"
    }
    return periodMap[period] || "Total for the last month"
  }

  return (
    <div className={`flex h-screen bg-white ${className}`}>
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/background.webp')"
          }}
        />
        
        {/* Header */}
        <div className="relative z-10 flex h-16 items-center justify-between px-6">
          <div>
            <h1 className="text-xl font-medium text-zinc-950">
              Welcome back, Midas Colingwood!
            </h1>
          </div>
          <TimeFilter 
            selectedPeriod={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
          />
        </div>

        {/* Dashboard Content */}
        <div className="relative z-10 flex-1 overflow-y-auto p-6 space-y-6">
          {/* KPI Cards */}
          <KpiCards 
            selectedKpi={selectedKpi}
            onKpiSelect={setSelectedKpi}
          />

          {/* Line Chart */}
          <DashboardLineChart
            data={chartData}
            title={getKpiTitle(selectedKpi)}
            subtitle={getKpiSubtitle(selectedPeriod)}
            trendPercentage={0} // This will be overridden by the component's internal logic
            selectedKpi={selectedKpi}
          />

          {/* Calls Table */}
          <CallsTable />
        </div>
      </div>
    </div>
  )
}
