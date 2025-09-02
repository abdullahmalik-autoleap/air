"use client"
import { useEffect, useState } from "react"
import { fetchRecentCalls } from "../lib/mock"
import type { Call } from "../types"
import CallCard from "@/components/shared/call-card"

export default function RecentCallsList() {
  const [calls, setCalls] = useState<Call[]>([])
  useEffect(() => {
    fetchRecentCalls().then(setCalls)
  }, [])
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {calls.map((c) => (
        <CallCard key={c.id} caller={c.caller} timestamp={c.time} status={c.status} duration={c.duration} />
      ))}
    </div>
  )
}


