"use client"

import React from "react"
import { Clock, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TimeFilterProps {
  selectedPeriod: string
  onPeriodChange: (period: string) => void
}

const timePeriods = [
  { value: "last-day", label: "Last day" },
  { value: "last-week", label: "Last week" },
  { value: "last-month", label: "Last month" }
]

export default function TimeFilter({ selectedPeriod, onPeriodChange }: TimeFilterProps) {
  const selectedLabel = timePeriods.find(p => p.value === selectedPeriod)?.label || "Last month"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="inline-flex items-center gap-2 h-8 px-3 rounded-md border border-[#E2E8F0] bg-white text-[#0E7169] hover:bg-[#F9F9F9] hover:border-[#CBD5E1] transition-colors">
          <Clock className="h-3.5 w-3.5" />
          <span className="text-sm font-semibold">{selectedLabel}</span>
          <ChevronDown className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {timePeriods.map((period) => (
          <DropdownMenuItem
            key={period.value}
            onClick={() => onPeriodChange(period.value)}
            className="cursor-pointer"
          >
            {period.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
