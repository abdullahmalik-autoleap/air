"use client"
import { useEffect, useState } from "react"
import { fetchShopSettings } from "../lib/mock"

export default function TabShop() {
  const [data, setData] = useState<{ name: string; phone: string } | null>(null)
  useEffect(() => {
    fetchShopSettings().then(setData)
  }, [])
  if (!data) return <div className="text-sm text-muted-foreground">Loading…</div>
  return (
    <div className="space-y-2">
      <div className="text-sm">Name: {data.name}</div>
      <div className="text-sm">Phone: {data.phone}</div>
    </div>
  )
}


