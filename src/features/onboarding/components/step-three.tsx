"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type BillingForm = {
  cardNumber: string
  nameOnCard: string
  expiry: string
  cvv: string
}

type Props = {
  onBack?: () => void
  onFinish?: (values: BillingForm) => void
  initialData?: BillingForm
}

export default function OnboardingStepThree({ onBack, onFinish, initialData }: Props) {
  const [form, setForm] = useState<BillingForm>(initialData || { cardNumber: "", nameOnCard: "", expiry: "", cvv: "" })

  const label = "text-sm font-medium text-slate-700"

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-6"
    >
      <h2 className="text-xl font-semibold text-slate-900">Billing Details</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className={label} htmlFor="cardNumber">Credit card number</label>
          <Input
            id="cardNumber"
            inputMode="numeric"
            placeholder="4641 5112 6787 2114"
            value={form.cardNumber}
            onChange={(e) => setForm({ ...form, cardNumber: e.target.value })}
            aria-label="Credit card number"
          />
        </div>

        <div className="space-y-2">
          <label className={label} htmlFor="nameOnCard">Name on card</label>
          <Input
            id="nameOnCard"
            placeholder="Alex Jason"
            value={form.nameOnCard}
            onChange={(e) => setForm({ ...form, nameOnCard: e.target.value })}
            aria-label="Name on card"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className={label} htmlFor="expiry">Expiry date</label>
            <Input
              id="expiry"
              placeholder="01/29"
              value={form.expiry}
              onChange={(e) => setForm({ ...form, expiry: e.target.value })}
              aria-label="Expiry date"
            />
          </div>
          <div className="space-y-2">
            <label className={label} htmlFor="cvv">CV</label>
            <Input
              id="cvv"
              inputMode="numeric"
              placeholder="565"
              value={form.cvv}
              onChange={(e) => setForm({ ...form, cvv: e.target.value })}
              aria-label="Security code"
            />
          </div>
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
          onClick={() => onFinish?.(form)}
          variant="primary"
          size="xlarge"
          rightIcon={<span aria-hidden>→</span>}
          aria-label="Continue"
        >
          Continue
        </Button>
      </div>
    </motion.div>
  )
}


