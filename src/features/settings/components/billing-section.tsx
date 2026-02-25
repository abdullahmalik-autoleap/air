"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"

export default function BillingSection() {
  const [formData, setFormData] = useState({
    creditCardNumber: "",
    nameOnCard: "",
    expiryDate: "",
    cvv: ""
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="bg-white rounded-lg border border-zinc-100 p-4 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)]">
      <h3 className="text-xl font-medium text-zinc-950 mb-4">Billing</h3>
      
      <div className="space-y-4">
        <div className="flex gap-4">
          {/* Credit Card Number - 50% */}
          <div className="w-[50%] space-y-2">
            <label className="text-sm font-medium text-zinc-950">Credit Card Number</label>
            <Input
              placeholder="e.g 1234 1234 1234 1234"
              value={formData.creditCardNumber}
              onChange={(e) => handleInputChange('creditCardNumber', e.target.value)}
              className="shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]"
            />
          </div>
          
          {/* Name On Card - 25% */}
          <div className="w-[25%] space-y-2">
            <label className="text-sm font-medium text-zinc-950">Name On Card</label>
            <Input
              placeholder="e.g Jon Doe"
              value={formData.nameOnCard}
              onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
              className="shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]"
            />
          </div>
          
          {/* MM YYYY - 12.5% */}
          <div className="w-[12.5%] space-y-2">
            <label className="text-sm font-medium text-zinc-950">MM YYYY</label>
            <Input
              placeholder="e.g 01/29"
              value={formData.expiryDate}
              onChange={(e) => handleInputChange('expiryDate', e.target.value)}
              className="shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]"
            />
          </div>
          
          {/* CVV - 12.5% */}
          <div className="w-[12.5%] space-y-2">
            <label className="text-sm font-medium text-zinc-950">CVV</label>
            <Input
              placeholder="e.g 123"
              value={formData.cvv}
              onChange={(e) => handleInputChange('cvv', e.target.value)}
              className="shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
