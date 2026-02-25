"use client"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import BasicInformation from "./basic-information"
import BillingSection from "./billing-section"
import PlanSection from "./plan-section"
import AgentPersonalization from "./agent-personalization"

export default function SettingsTabs() {
  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="bg-white border border-zinc-100 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] rounded-lg p-1 h-auto">
        <TabsTrigger 
          value="general" 
          className="data-[state=active]:bg-[#0e7169] data-[state=active]:text-white data-[state=inactive]:text-zinc-950 data-[state=inactive]:bg-white data-[state=inactive]:hover:bg-zinc-50 data-[state=inactive]:hover:text-zinc-700 data-[state=inactive]:cursor-pointer transition-colors rounded-md px-3 py-2 text-sm font-medium"
        >
          General Details
        </TabsTrigger>
        <TabsTrigger 
          value="agent" 
          className="data-[state=active]:bg-[#0e7169] data-[state=active]:text-white data-[state=inactive]:text-zinc-950 data-[state=inactive]:bg-white data-[state=inactive]:hover:bg-zinc-50 data-[state=inactive]:hover:text-zinc-700 data-[state=inactive]:cursor-pointer transition-colors rounded-md px-3 py-2 text-sm font-medium"
        >
          Agent Personalization
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="general" className="space-y-5 mt-5">
        <BasicInformation />
        <BillingSection />
        <PlanSection />
      </TabsContent>
      
      <TabsContent value="agent" className="mt-5">
        <AgentPersonalization />
      </TabsContent>
    </Tabs>
  )
}


