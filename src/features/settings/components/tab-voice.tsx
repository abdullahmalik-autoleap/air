"use client"
import { useEffect, useState } from "react"
import { fetchVoiceSettings } from "../lib/mock"

export default function TabVoice() {
  const [data, setData] = useState<{ voiceId: string; speed: number } | null>(null)
  useEffect(() => {
    fetchVoiceSettings().then(setData)
  }, [])
  if (!data) return <div className="text-sm text-muted-foreground">Loading…</div>
  return (
    <div className="space-y-2">
      <div className="text-sm">Voice: {data.voiceId}</div>
      <div className="text-sm">Speed: {data.speed}x</div>
    </div>
  )
}


