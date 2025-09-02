import { z } from "zod"

export const accountSchema = z.object({
  shopName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  cardLast4: z.string().length(4),
})

export const personalizeSchema = z.object({
  voiceId: z.string().min(1),
  language: z.string().min(2),
  timezone: z.string().min(2),
  routing: z.enum(["forward-all", "screen", "ivr"]),
})

export type AccountSchema = z.infer<typeof accountSchema>
export type PersonalizeSchema = z.infer<typeof personalizeSchema>


