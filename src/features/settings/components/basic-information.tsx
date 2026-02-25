"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { AlertTriangle, Search } from "lucide-react"

export default function BasicInformation() {
  const [formData, setFormData] = useState({
    shopName: "Midas Collingwood",
    emailAddress: "alex.jason@gmail.com",
    shopTimeFrom: "",
    shopTimeTill: "",
    shopPhoneNumber: "+2 435 5675",
    shopAddress: "123 Maple Avenue, Toronto, ON, Canada"
  })

  const [errors, setErrors] = useState({
    shopTimeFrom: true, // This field is required and shows warning
    shopTimeTill: true
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: false }))
    }
  }

  const FieldLabel = ({ 
    children, 
    hasError = false 
  }: { 
    children: React.ReactNode
    hasError?: boolean 
  }) => (
    <div className="flex items-center gap-1">
      <span className="text-sm font-medium text-zinc-950">{children}</span>
      {hasError && (
        <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
      )}
    </div>
  )

  return (
    <div className="bg-white rounded-lg border border-zinc-100 p-4 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)]">
      <h3 className="text-xl font-medium text-zinc-950 mb-4">Basic Information</h3>
      
      <div className="space-y-4">
        {/* First row - Shop Name and Email Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <FieldLabel>Shop Name</FieldLabel>
            <Input
              value={formData.shopName}
              onChange={(e) => handleInputChange('shopName', e.target.value)}
              className="shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]"
            />
          </div>
          <div className="space-y-2">
            <FieldLabel>Email Address</FieldLabel>
            <Input
              value={formData.emailAddress}
              onChange={(e) => handleInputChange('emailAddress', e.target.value)}
              className="shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]"
            />
          </div>
        </div>

        {/* Second row - Shop Time and Shop Phone Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <FieldLabel hasError={errors.shopTimeFrom}>Shop Time</FieldLabel>
            <div className="relative">
              <div className="flex">
                <div className="flex-1 relative">
                  <Input
                    placeholder="From"
                    value={formData.shopTimeFrom}
                    onChange={(e) => handleInputChange('shopTimeFrom', e.target.value)}
                    className={`rounded-r-none border-r-0 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)] ${
                      errors.shopTimeFrom ? 'border-amber-600' : 'border-slate-200'
                    }`}
                  />
                </div>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Till"
                    value={formData.shopTimeTill}
                    onChange={(e) => handleInputChange('shopTimeTill', e.target.value)}
                    className={`rounded-l-none border-l-0 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)] ${
                      errors.shopTimeTill ? 'border-amber-600' : 'border-slate-200'
                    }`}
                  />
                </div>
              </div>
              <div className={`absolute inset-0 pointer-events-none rounded-md border-2 ${
                errors.shopTimeFrom || errors.shopTimeTill ? 'border-amber-600' : 'border-slate-200'
              }`} />
            </div>
          </div>
          <div className="space-y-2">
            <FieldLabel>Shop Phone Number</FieldLabel>
            <Input
              value={formData.shopPhoneNumber}
              onChange={(e) => handleInputChange('shopPhoneNumber', e.target.value)}
              className="shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]"
            />
          </div>
        </div>

        {/* Third row - Shop Address */}
        <div className="space-y-2">
          <FieldLabel>Shop Address</FieldLabel>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              value={formData.shopAddress}
              onChange={(e) => handleInputChange('shopAddress', e.target.value)}
              className="pl-10 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
