export type AccountInfo = {
  shopName: string
  email: string
  phone: string
  cardLast4: string
}

export type PersonalizeInfo = {
  voiceId: string
  language: string
  timezone: string
  routing: "forward-all" | "screen" | "ivr"
}

export type ProvisionedNumber = {
  id: string
  e164: string
}


