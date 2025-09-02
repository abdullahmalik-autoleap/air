export type ShopSettings = {
  name: string
  phone: string
  address?: string
}

export type VoiceSettings = {
  voiceId: string
  speed: number
}

export type KnowledgeBaseSettings = {
  faqs: string[]
}

export type PrivacySettings = {
  callRecording: boolean
}

export type BillingSettings = {
  plan: string
  minutesIncluded: number
}


