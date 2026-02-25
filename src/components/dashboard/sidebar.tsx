"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { 
  BarChart3, 
  Phone, 
  Settings, 
  Headphones,
  ChevronRight
} from "lucide-react"
import { UserAccountButton } from "./user-account-button"
import { UserAccountMenu } from "./user-account-menu"

interface SidebarProps {
  className?: string
}

const navigationItems = [
  {
    name: "Overview",
    href: "/overview",
    icon: BarChart3
  },
  {
    name: "Calls",
    href: "/calls",
    icon: Phone
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings
  }
]


export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light")

  const handleToggleDropdown = () => {
    console.log("Toggle clicked, current state:", isDropdownOpen, "-> new state:", !isDropdownOpen)
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleThemeToggle = () => {
    setCurrentTheme(currentTheme === "light" ? "dark" : "light")
    // TODO: Implement actual theme switching logic
  }

  const handleGetHelp = () => {
    // TODO: Implement get help functionality
    console.log("Get Help clicked")
  }

  const handleLogOut = () => {
    // TODO: Implement log out functionality
    console.log("Log out clicked")
  }

  return (
    <div className={cn("flex h-full w-64 flex-col bg-white border-r border-zinc-100", className)}>
      {/* Header */}
      <div className="flex h-14 items-center justify-between px-4 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-teal-600">
            <span className="text-sm font-semibold text-white">A</span>
          </div>
          <span className="text-lg font-semibold text-teal-600">AIR</span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-2 py-4">
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#F0FDFA] text-[#0E7169] border border-[#F4F4F5]"
                    : "text-zinc-700 hover:bg-zinc-50"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
                {isActive && (
                  <ChevronRight className="ml-auto h-4 w-4 text-[#0E7169]" />
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Your AIR Phone Number Widget */}
      <div className="px-4 pb-4">
        <div 
          className="rounded-lg p-4 text-white relative overflow-hidden"
          style={{
            backgroundImage: "url('/images/bg-gradient-1.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        >
          <div className="flex flex-col relative z-10">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-white/20 mb-3">
              <Headphones className="h-5 w-5" />
            </div>
            <div className="text-lg font-medium mb-1">+2 342 3423</div>
            <div className="text-xs text-teal-100">Your AIR Phone Number</div>
          </div>
        </div>
      </div>

      {/* User Account Section */}
      <div className="relative">
        <UserAccountButton 
          onToggleDropdown={handleToggleDropdown}
          isDropdownOpen={isDropdownOpen}
        />
        <UserAccountMenu
          isOpen={isDropdownOpen}
          onClose={() => {
            console.log("Dropdown closing")
            setIsDropdownOpen(false)
          }}
          currentTheme={currentTheme}
          onThemeToggle={handleThemeToggle}
          onGetHelp={handleGetHelp}
          onLogOut={handleLogOut}
        />
      </div>
    </div>
  )
}
