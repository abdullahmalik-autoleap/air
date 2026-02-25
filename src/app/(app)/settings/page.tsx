"use client"

import Sidebar from "@/components/dashboard/sidebar"
import { SettingsTabs } from "@/features/settings"

export default function SettingsPage() {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/background.webp')"
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 flex-1 overflow-y-auto p-5">
          <div className="space-y-5">
            <h1 className="text-xl font-medium text-zinc-950">Settings</h1>
            <SettingsTabs />
          </div>
        </div>
      </div>
    </div>
  )
}


