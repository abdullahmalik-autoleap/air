"use client"
import * as Tabs from "@radix-ui/react-tabs"
import TabShop from "./tab-shop"
import TabVoice from "./tab-voice"
import TabKb from "./tab-kb"
import TabPrivacy from "./tab-privacy"
import TabBilling from "./tab-billing"

export default function SettingsTabs() {
  return (
    <Tabs.Root defaultValue="shop" className="w-full">
      <Tabs.List className="flex gap-2 border-b">
        {[
          ["shop", "Shop"],
          ["voice", "Voice"],
          ["kb", "Knowledge Base"],
          ["privacy", "Privacy"],
          ["billing", "Billing"],
        ].map(([value, label]) => (
          <Tabs.Trigger key={value} value={value} className="rounded-t-md px-3 py-2 text-sm data-[state=active]:bg-background data-[state=active]:font-medium">
            {label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <Tabs.Content value="shop" className="py-4">
        <TabShop />
      </Tabs.Content>
      <Tabs.Content value="voice" className="py-4">
        <TabVoice />
      </Tabs.Content>
      <Tabs.Content value="kb" className="py-4">
        <TabKb />
      </Tabs.Content>
      <Tabs.Content value="privacy" className="py-4">
        <TabPrivacy />
      </Tabs.Content>
      <Tabs.Content value="billing" className="py-4">
        <TabBilling />
      </Tabs.Content>
    </Tabs.Root>
  )
}


