"use client"

import { useState } from "react"
import Image from "next/image"
import { PLAN_ICON_GROWTH, PLAN_ICON_STARTER } from "@/config/assets"

type Plan = {
  id: "starter" | "growth"
  title: string
  subtitle: string
  price: string
  calls: string
  icon: string
}

const PLANS: Plan[] = [
  {
    id: "starter",
    title: "Starter Plan",
    subtitle: "Perfect for small shops just getting started with AiR.",
    price: "$99/month",
    calls: "200 calls",
    icon: PLAN_ICON_STARTER,
  },
  {
    id: "growth",
    title: "Growth Plan",
    subtitle: "Get reliable call coverage for everyday business needs without overpaying.",
    price: "$199/month",
    calls: "500 calls",
    icon: PLAN_ICON_GROWTH,
  },
]

export default function PlanSection() {
  const [selectedPlan, setSelectedPlan] = useState<Plan["id"]>("starter")

  const handleSelectPlan = (planId: Plan["id"]) => {
    setSelectedPlan(planId)
  }

  return (
    <div className="bg-white rounded-lg border border-zinc-100 p-4 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)]">
      <h3 className="text-xl font-medium text-zinc-950 mb-4">Plan</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PLANS.map((plan) => {
          const isSelected = plan.id === selectedPlan
          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => handleSelectPlan(plan.id)}
              className={`group rounded-lg border text-left shadow-sm transition-all p-4 ${
                isSelected
                  ? "border-[#0e7169] ring-1 ring-[#0e7169]/20"
                  : "border-slate-200 hover:shadow-md hover:border-slate-300"
              }`}
              aria-pressed={isSelected}
            >
              <div className="space-y-3">
                {/* Icon */}
                <div className="h-11 w-11 overflow-hidden rounded-md bg-teal-50 flex items-center justify-center">
                  <Image
                    src={plan.icon}
                    alt="Plan icon"
                    width={44}
                    height={44}
                    className="object-contain"
                  />
                </div>

                {/* Header */}
                <div className="space-y-1">
                  <h4 className="text-lg font-semibold text-slate-900">{plan.title}</h4>
                  <p className="text-sm text-slate-500 leading-5">{plan.subtitle}</p>
                </div>

                {/* Price and Calls */}
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-semibold text-[#0e7169]">{plan.price}</p>
                  <span className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700">
                    <span aria-hidden>📞</span>
                    {plan.calls}
                  </span>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-100"></div>

                {/* Features */}
                <div className="space-y-3 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center">
                      <span className="text-xs text-slate-600">✓</span>
                    </div>
                    <span>30-day free trial — no commitments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center">
                      <span className="text-xs text-slate-600">✓</span>
                    </div>
                    <span>Affordable overage at $0.75 per call</span>
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
