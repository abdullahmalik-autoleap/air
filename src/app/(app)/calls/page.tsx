import SectionHeader from "@/components/shared/section-header"
import { CallsTable } from "@/features/calls"

export default function CallsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Calls" description="Full call log" />
      <CallsTable />
    </div>
  )
}


