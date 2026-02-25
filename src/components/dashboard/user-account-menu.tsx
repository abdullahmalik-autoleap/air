"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CircleHelp, LogOut, Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"

interface UserAccountMenuProps {
  className?: string
  isOpen?: boolean
  onClose?: () => void
  currentTheme?: "light" | "dark"
  onThemeToggle?: () => void
  onGetHelp?: () => void
  onLogOut?: () => void
}

const balanceData = [
  { label: "Total", value: "500 mins" },
  { label: "Used", value: "100 mins" },
  { label: "Remaining", value: "400 mins" },
]

export const UserAccountMenu = ({ 
  className,
  isOpen = false,
  onClose,
  currentTheme = "light",
  onThemeToggle,
  onGetHelp,
  onLogOut
}: UserAccountMenuProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        // Check if the click is not on the user account button
        const userAccountButton = document.querySelector('[data-user-account-button]')
        if (userAccountButton && !userAccountButton.contains(event.target as Node)) {
          onClose?.()
        }
      }
    }

    if (isOpen) {
      // Use a small delay to prevent immediate closing when button is clicked
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside)
      }, 100)

      return () => {
        clearTimeout(timeoutId)
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const menuItems = [
    { 
      icon: currentTheme === "light" ? Sun : Moon, 
      label: currentTheme === "light" ? "Change To Dark Theme" : "Change To Light Theme",
      onClick: onThemeToggle
    },
    { 
      icon: CircleHelp, 
      label: "Get Help",
      onClick: onGetHelp
    },
    { 
      icon: LogOut, 
      label: "Log out",
      onClick: onLogOut
    },
  ]

  return (
    <div 
      ref={dropdownRef}
      className={cn(
        "fixed bg-white border border-zinc-100 w-[260px] z-50 shadow-2xl overflow-hidden",
        "left-[272px] bottom-[12px]",
        className
      )}
      style={{
        left: "272px",
        bottom: "12px",
        borderRadius: "8px"
      }}
    >
      {/* Balance Section */}
      <div className="bg-gray-50 p-1">
        <div className="bg-white rounded-lg border border-zinc-100 shadow-sm p-3">
          <div className="text-sm font-medium text-zinc-950 mb-2">
            Your Balance
          </div>
          
          {balanceData.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center mb-1 last:mb-0"
            >
              <span className="text-sm font-medium text-zinc-600">
                {item.label}
              </span>
              <span className="text-sm font-medium text-zinc-950">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-white">
        {menuItems.map((item, index) => {
          const IconComponent = item.icon
          return (
            <button
              key={index}
              className="w-full h-10 px-3 py-0 bg-white hover:bg-gray-50 flex items-center gap-2 text-left"
              onClick={item.onClick}
            >
              <IconComponent className="w-4 h-4 flex-shrink-0 text-zinc-600" />
              <span className="text-sm font-medium text-zinc-950 flex-1">
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default UserAccountMenu