import type {
  BillingSettings,
  KnowledgeBaseSettings,
  PrivacySettings,
  ShopSettings,
  VoiceSettings,
} from "../types"

export const fetchShopSettings = async (): Promise<ShopSettings> => ({ name: "Autoleap Shop", phone: "+1 (555) 010-0001" })
export const fetchVoiceSettings = async (): Promise<VoiceSettings> => ({ voiceId: "voice_1", speed: 1 })
export const fetchKbSettings = async (): Promise<KnowledgeBaseSettings> => ({ faqs: ["Hours? 9-5", "Location? Main St"] })
export const fetchPrivacySettings = async (): Promise<PrivacySettings> => ({ callRecording: true })
export const fetchBillingSettings = async (): Promise<BillingSettings> => ({ plan: "Pro", minutesIncluded: 2000 })


