"use client"
import { useEffect, useState } from "react"
import { fetchPrivacySettings } from "../lib/mock"

export default function TabPrivacy() {
  const [data, setData] = useState<{ callRecording: boolean } | null>(null)
  useEffect(() => {
    fetchPrivacySettings().then(setData)
  }, [])
  if (!data) return <div className="text-sm text-muted-foreground">Loading…</div>
  return (
    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" checked={data.callRecording} readOnly />
      Enable call recording
    </label>
  )
}


