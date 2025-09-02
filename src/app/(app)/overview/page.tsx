import SectionHeader from "@/components/shared/section-header"
import { KpisSection, RecentCallsList } from "@/features/overview"

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Overview" description="KPIs and recent calls" />
      <KpisSection />
      <RecentCallsList />
    </div>
  )
}


