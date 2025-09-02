import type { CallLog } from "../types"

export const fetchCalls = async (): Promise<CallLog[]> => {
  await new Promise((r) => setTimeout(r, 300))
  return Array.from({ length: 20 }).map((_, i) => ({
    id: `call_${i + 1}`,
    caller: `+1 (555) 010-${(2000 + i).toString().slice(-4)}`,
    time: `2025-01-${(i % 28) + 1} 09:${(i * 5) % 60}`,
    status: ["answered", "missed", "voicemail"][i % 3],
    duration: `${1 + (i % 8)}m`,
    notes: i % 4 === 0 ? "Requested callback" : undefined,
  }))
}


