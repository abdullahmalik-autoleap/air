"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PLAN_ICON_GROWTH, PLAN_ICON_STARTER } from "@/config/assets"

type Plan = {
  id: "starter" | "growth"
  title: string
  subtitle: string
  price: string
  calls: string
  badgeBg: string
}

const PLANS: Plan[] = [
  {
    id: "starter",
    title: "Starter Plan",
    subtitle: "Perfect for small shops just getting started with AiR.",
    price: "$99/month",
    calls: "200 calls",
    badgeBg: "",
  },
  {
    id: "growth",
    title: "Growth Plan",
    subtitle: "Get reliable call coverage for everyday business needs without overpaying.",
    price: "$199/month",
    calls: "500 calls",
    badgeBg: "",
  },
]

type Props = {
  onBack?: () => void
  onContinue?: (planId: Plan["id"]) => void
  initialSelectedPlan?: "starter" | "growth" | null
}

export default function OnboardingStepTwo({ onBack, onContinue, initialSelectedPlan }: Props) {
  const [selected, setSelected] = useState<Plan["id"]>(initialSelectedPlan || "starter")

  const handleSelect = (id: Plan["id"]) => {
    setSelected(id)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-6"
    >
      <h2 className="text-xl font-semibold text-slate-900">Choose Your Plan</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {PLANS.map((plan) => {
          const isSelected = plan.id === selected
          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => handleSelect(plan.id)}
              className={`group rounded-xl border text-left shadow-sm transition-all ${
                isSelected
                  ? "border-[#0e7169] ring-1 ring-[#0e7169]/20"
                  : "border-slate-200 hover:shadow-md hover:border-slate-300"
              }`}
              aria-pressed={isSelected}
            >
              <div className="p-5">
                <div className="h-11 w-11 overflow-hidden rounded-md">
                  <Image
                    src={plan.id === "starter" ? PLAN_ICON_STARTER : PLAN_ICON_GROWTH}
                    alt="Plan icon"
                    width={44}
                    height={44}
                  />
                </div>
                <p className="mt-4 text-lg font-semibold text-slate-900">{plan.title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{plan.subtitle}</p>

                <div className="mt-5 flex items-center justify-between border-t pt-4">
                  <p className="text-2xl font-semibold tracking-tight text-emerald-700">{plan.price}</p>
                  <span className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700">
                    <span aria-hidden>📞</span>
                    {plan.calls}
                  </span>
                </div>

                <div className="mt-4 space-y-3 text-sm text-slate-700">
                  <div className="flex items-center gap-2"><span aria-hidden>✔</span>30-day free trial — no commitments</div>
                  <div className="flex items-center gap-2"><span aria-hidden>✔</span>Affordable overage at $0.75 per call</div>
                </div>
              </div>
            </button>
          )
        })}
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
          onClick={() => onContinue?.(selected)}
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


