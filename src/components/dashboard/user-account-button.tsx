"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChevronDown, ChevronRight, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface UserAccountButtonProps {
  className?: string
  onToggleDropdown?: () => void
  isDropdownOpen?: boolean
}

export const UserAccountButton = ({ 
  className, 
  onToggleDropdown, 
  isDropdownOpen = false 
}: UserAccountButtonProps) => {
  return (
    <div className={cn("px-2 py-1 mb-2", className)}>
      <button
        className="w-full bg-white rounded-md border-0 shadow-none cursor-pointer hover:bg-gray-50 transition-colors flex items-center gap-2 p-2"
        onClick={onToggleDropdown}
        data-user-account-button
      >
        {/* Avatar with Progress Ring */}
        <div className="relative w-10 h-10 flex-shrink-0">
          {/* Circular progress bar */}
          <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 40 40">
            <circle
              cx="20"
              cy="20"
              r="16"
              stroke="#e5e7eb"
              strokeWidth="2"
              fill="none"
            />
            <circle
              cx="20"
              cy="20"
              r="16"
              stroke="#10b981"
              strokeWidth="2"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 16 * 0.25} ${2 * Math.PI * 16}`}
              strokeLinecap="round"
            />
          </svg>
          
          {/* Avatar */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Avatar size="sm" className="bg-gray-200">
              <AvatarFallback className="bg-gray-200">
                <User className="w-4 h-4 text-gray-600" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex flex-col justify-center flex-1 min-w-0">
          <div className="text-sm font-medium text-zinc-950 leading-5 truncate w-full text-left">
            Midas Collingwood
          </div>
          <div className="text-xs font-medium text-zinc-500 leading-4 text-left">
            My account
          </div>
        </div>

        {/* Chevron */}
        {isDropdownOpen ? (
          <ChevronRight className="w-4 h-4 text-gray-500 transition-transform flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500 transition-transform flex-shrink-0" />
        )}
      </button>
    </div>
  )
}

export default UserAccountButton