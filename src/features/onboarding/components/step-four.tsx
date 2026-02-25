"use client"
import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

type Props = {
  onBack?: () => void
  onFinish?: (values: { shopName: string; emails: string[] }) => void
  initialData?: { shopName: string; emails: string[] }
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

export default function OnboardingStepFour({ onBack, onFinish, initialData }: Props) {
  const [shopName, setShopName] = useState<string>(initialData?.shopName || "")
  const [emailInput, setEmailInput] = useState<string>("")
  const [emails, setEmails] = useState<string[]>(initialData?.emails || [])
  const [invalid, setInvalid] = useState<boolean>(false)
  const [isCreating, setIsCreating] = useState<boolean>(false)

  const canAddMore = emails.length < 5
  const emailInputClasses = useMemo(() => {
    const base = "h-11 w-full rounded-md border bg-white px-3 text-sm text-slate-900 shadow-sm outline-none ring-offset-white placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-300 focus:ring-2"
    return invalid ? `${base} border-red-500 focus:ring-red-200` : `${base} border-slate-200 focus:ring-[#0e7169]/20`
  }, [invalid])

  const handleAddEmail = () => {
    const value = emailInput.trim()
    if (!value) return
    if (!emailRegex.test(value)) {
      setInvalid(true)
      return
    }
    if (!canAddMore) return
    if (emails.includes(value)) {
      setEmailInput("")
      setInvalid(false)
      return
    }
    setEmails([...emails, value])
    setEmailInput("")
    setInvalid(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddEmail()
    }
  }

  const handleRemove = (value: string) => {
    setEmails(emails.filter((e) => e !== value))
  }

  const handleCreate = async () => {
    if (!shopName || isCreating) return
    
    setIsCreating(true)
    
    // Simulate loading for 2 seconds
    setTimeout(() => {
      onFinish?.({ shopName, emails })
      setIsCreating(false)
    }, 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-6"
    >
      <h2 className="text-xl font-semibold text-slate-900">AIR Agent Setup</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="greeting-name">Shop&apos;s name used in call greetings</label>
          <Input
            id="greeting-name"
            placeholder="Midas Collingwood"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            aria-label="Shop name used in call greetings"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="summary-emails">Email where all call summaries are sent</label>
          <input
            id="summary-emails"
            type="email"
            value={emailInput}
            onChange={(e) => { setEmailInput(e.target.value); if (invalid) setInvalid(false) }}
            onKeyDown={handleKeyDown}
            placeholder="Add emails (max 5 allowed)"
            className={emailInputClasses}
            aria-invalid={invalid}
            aria-label="Add summary email"
          />
          {emails.length ? (
            <div className="flex flex-wrap gap-2">
              {emails.map((em) => (
                <span
                  key={em}
                  className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700"
                >
                  {em}
                  <Button 
                    type="button" 
                    onClick={() => handleRemove(em)} 
                    variant="ghost"
                    size="xsmall"
                    className="h-auto p-1 text-slate-400 hover:text-slate-600" 
                    aria-label={`Remove ${em}`}
                  >
                    ×
                  </Button>
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Button
          type="button"
          onClick={onBack}
          variant="tertiary"
          size="xlarge"
          leftIcon={<span aria-hidden>←</span>}
          aria-label="Back"
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={handleCreate}
          variant="primary"
          size="xlarge"
          rightIcon={isCreating ? <Spinner className="w-4 h-4" /> : <span aria-hidden>→</span>}
          aria-label={isCreating ? "Creating..." : "Create"}
          disabled={!shopName || isCreating}
        >
          {isCreating ? "Creating..." : "Create"}
        </Button>
      </div>
    </motion.div>
  )
}


