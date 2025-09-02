export type Call = {
  id: string
  caller: string
  time: string
  status: "answered" | "missed" | "voicemail"
  duration: string
}

export type Kpis = {
  answeredRate: number
  minutes: number
  appointmentRequests: number
}


