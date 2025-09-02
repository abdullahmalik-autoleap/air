"use client"
import { useEffect, useState } from "react"
import { fetchKpis } from "../lib/mock"
import type { Kpis } from "../types"
import KpiCard from "@/components/shared/kpi-card"
import MinutesMeter from "@/components/shared/minutes-meter"

export default function KpisSection() {
  const [kpis, setKpis] = useState<Kpis | null>(null)
  useEffect(() => {
    fetchKpis().then(setKpis)
  }, [])
  if (!kpis) return <div className="text-sm text-muted-foreground">Loading KPIs…</div>
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <KpiCard label="Answered rate" value={`${Math.round(kpis.answeredRate * 100)}%`} />
      <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
        <MinutesMeter usedMinutes={kpis.minutes} includedMinutes={2000} />
      </div>
      <KpiCard label="Appointment requests" value={`${kpis.appointmentRequests}`} />
    </div>
  )
}


