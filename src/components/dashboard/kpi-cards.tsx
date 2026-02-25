"use client"

import React, { useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { 
  Phone, 
  Handshake, 
  CheckCircle, 
  PhoneOff, 
  ArrowRightLeft,
  DollarSign,
  Car,
  RotateCcw,
  MessageSquare,
  X
} from "lucide-react"

interface KpiCardProps {
  title: string
  value: string | number
  icon: React.ComponentType<{ className?: string }>
  isActive?: boolean
  onClick?: () => void
}

const KpiCard = ({ title, value, icon: Icon, isActive, onClick }: KpiCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col gap-2 rounded-lg border p-3 text-left transition-all hover:shadow-md",
        "min-w-[240px] flex-shrink-0",
        isActive
          ? "border-[#0E7169] bg-white text-[#0E7169]"
          : "border-slate-200 bg-white text-zinc-700 shadow-sm"
      )}
    >
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4" />
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className={cn(
        "text-xl font-semibold",
        isActive ? "text-[#0E7169]" : "text-zinc-900"
      )}>
        {value}
      </div>
    </button>
  )
}

interface KpiCardsProps {
  selectedKpi?: string
  onKpiSelect?: (kpi: string) => void
}

const kpiData = [
  {
    id: "total-calls",
    title: "Total Calls",
    value: "127",
    icon: Phone
  },
  {
    id: "appointment-requests",
    title: "Appointment Requests",
    value: "23",
    icon: Handshake
  },
  {
    id: "appointment-confirmations",
    title: "Appointment Confirmations",
    value: "18",
    icon: CheckCircle
  },
  {
    id: "hangups",
    title: "Hangups",
    value: "12",
    icon: PhoneOff
  },
  {
    id: "transfer-to-human",
    title: "Transfer to Human",
    value: "8",
    icon: ArrowRightLeft
  },
  {
    id: "pricing-inquiries",
    title: "Pricing Inquiries",
    value: "15",
    icon: DollarSign
  },
  {
    id: "vehicle-status",
    title: "Vehicle Status",
    value: "31",
    icon: Car
  },
  {
    id: "returning-call",
    title: "Returning a Call",
    value: "6",
    icon: RotateCcw
  },
  {
    id: "took-message",
    title: "Took Message",
    value: "9",
    icon: MessageSquare
  },
  {
    id: "cancelled-appointments",
    title: "Cancelled Appointments",
    value: "4",
    icon: X
  }
]

export default function KpiCards({ selectedKpi = "total-calls", onKpiSelect }: KpiCardsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
    scrollRef.current.style.scrollBehavior = 'auto'
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = 'smooth'
    }
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = 'smooth'
    }
    setIsDragging(false)
  }

  return (
    <div 
      ref={scrollRef}
      className="flex gap-3 overflow-x-auto pb-2 scrollbar-none cursor-grab active:cursor-grabbing select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {kpiData.map((kpi) => (
        <KpiCard
          key={kpi.id}
          title={kpi.title}
          value={kpi.value}
          icon={kpi.icon}
          isActive={selectedKpi === kpi.id}
          onClick={() => onKpiSelect?.(kpi.id)}
        />
      ))}
    </div>
  )
}
