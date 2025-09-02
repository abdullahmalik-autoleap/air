"use client"
import { useEffect, useState } from "react"
import { fetchKbSettings } from "../lib/mock"

export default function TabKb() {
  const [data, setData] = useState<{ faqs: string[] } | null>(null)
  useEffect(() => {
    fetchKbSettings().then(setData)
  }, [])
  if (!data) return <div className="text-sm text-muted-foreground">Loading…</div>
  return (
    <ul className="list-disc pl-5 text-sm text-muted-foreground">
      {data.faqs.map((f, i) => (
        <li key={i}>{f}</li>
      ))}
    </ul>
  )
}


