import type { Call, Kpis } from "../types"

export const fetchRecentCalls = async (): Promise<Call[]> => {
  await new Promise((r) => setTimeout(r, 300))
  return Array.from({ length: 10 }).map((_, i) => ({
    id: `call_${i + 1}`,
    caller: `+1 (555) 010-${(1000 + i).toString().slice(-4)}`,
    time: `2025-01-0${(i % 7) + 1} 10:${(i * 3) % 60}`,
    status: (['answered','missed','voicemail'] as const)[i % 3],
    duration: `${2 + i}m` ,
  }))
}

export const fetchKpis = async (): Promise<Kpis> => {
  await new Promise((r) => setTimeout(r, 200))
  return { answeredRate: 0.86, minutes: 1240, appointmentRequests: 32 }
}


