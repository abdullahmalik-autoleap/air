"use client"
import { useEffect, useState } from "react"
import { fetchBillingSettings } from "../lib/mock"

export default function TabBilling() {
  const [data, setData] = useState<{ plan: string; minutesIncluded: number } | null>(null)
  useEffect(() => {
    fetchBillingSettings().then(setData)
  }, [])
  if (!data) return <div className="text-sm text-muted-foreground">Loading…</div>
  return (
    <div className="space-y-2 text-sm">
      <div>Plan: {data.plan}</div>
      <div>Minutes included: {data.minutesIncluded}</div>
    </div>
  )
}


