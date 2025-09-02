import SectionHeader from "@/components/shared/section-header"
import { SettingsTabs } from "@/features/settings"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Settings" description="Manage your AiR configuration" />
      <SettingsTabs />
    </div>
  )
}


