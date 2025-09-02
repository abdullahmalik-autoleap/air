"use client"
import { useState } from "react"
import { accountSchema, personalizeSchema, type AccountSchema, type PersonalizeSchema } from "../lib/schemas"
import { mockProvisionNumber } from "../lib/mock"

type Step = "account" | "personalize" | "ready"

export default function OnboardingFlow() {
  const [step, setStep] = useState<Step>("account")
  const [account, setAccount] = useState<AccountSchema | null>(null)
  const [prefs, setPrefs] = useState<PersonalizeSchema | null>(null)
  const [number, setNumber] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleAccount = async (data: AccountSchema) => {
    const parsed = accountSchema.safeParse(data)
    if (!parsed.success) return
    setAccount(parsed.data)
    setStep("personalize")
  }

  const handlePersonalize = async (data: PersonalizeSchema) => {
    const parsed = personalizeSchema.safeParse(data)
    if (!parsed.success || !account) return
    setPrefs(parsed.data)
    setLoading(true)
    const num = await mockProvisionNumber(account, parsed.data)
    setNumber(num.e164)
    setLoading(false)
    setStep("ready")
  }

  return (
    <div className="mx-auto max-w-2xl">
      {step === "account" ? (
        <AccountStep onNext={handleAccount} />
      ) : step === "personalize" ? (
        <PersonalizeStep onNext={handlePersonalize} />
      ) : (
        <ReadyStep number={number} loading={loading} />
      )}
    </div>
  )
}

type AccountStepProps = { onNext: (data: AccountSchema) => void }
function AccountStep({ onNext }: AccountStepProps) {
  const [form, setForm] = useState<AccountSchema>({ shopName: "", email: "", phone: "", cardLast4: "" })
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Account</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <input className="rounded-md border px-3 py-2 text-sm" placeholder="Shop name" value={form.shopName} onChange={(e) => setForm({ ...form, shopName: e.target.value })} />
        <input className="rounded-md border px-3 py-2 text-sm" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="rounded-md border px-3 py-2 text-sm" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input className="rounded-md border px-3 py-2 text-sm" placeholder="Card last 4" value={form.cardLast4} onChange={(e) => setForm({ ...form, cardLast4: e.target.value })} />
      </div>
      <div className="flex justify-end">
        <button onClick={() => onNext(form)} className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
          Continue
        </button>
      </div>
    </div>
  )
}

type PersonalizeStepProps = { onNext: (data: PersonalizeSchema) => void }
function PersonalizeStep({ onNext }: PersonalizeStepProps) {
  const [form, setForm] = useState<PersonalizeSchema>({ voiceId: "voice_1", language: "en-US", timezone: "UTC", routing: "forward-all" })
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Personalize</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <input className="rounded-md border px-3 py-2 text-sm" placeholder="Voice ID" value={form.voiceId} onChange={(e) => setForm({ ...form, voiceId: e.target.value })} />
        <input className="rounded-md border px-3 py-2 text-sm" placeholder="Language" value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })} />
        <input className="rounded-md border px-3 py-2 text-sm" placeholder="Timezone" value={form.timezone} onChange={(e) => setForm({ ...form, timezone: e.target.value })} />
        <select className="rounded-md border px-3 py-2 text-sm" value={form.routing} onChange={(e) => setForm({ ...form, routing: e.target.value as PersonalizeSchema["routing"] })}>
          <option value="forward-all">Forward all</option>
          <option value="screen">Screen calls</option>
          <option value="ivr">IVR</option>
        </select>
      </div>
      <div className="flex justify-end">
        <button onClick={() => onNext(form)} className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
          Continue
        </button>
      </div>
    </div>
  )
}

function ReadyStep({ number, loading }: { number: string | null; loading: boolean }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Your AiR number is ready</h2>
      {loading ? <p className="text-sm text-muted-foreground">Provisioning…</p> : <p className="text-2xl font-semibold">{number}</p>}
      <ul className="list-disc pl-5 text-sm text-muted-foreground">
        <li>Add this number to your website</li>
        <li>Update call forwarding from your carrier</li>
        <li>Invite your team</li>
      </ul>
    </div>
  )
}


