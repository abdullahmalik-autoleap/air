"use client"

import { X } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Call {
  id: string
  customerName: string
  phoneNumber: string
  date: string
  time: string
  reason: string
}

interface CallDetailDrawerProps {
  call: Call | null
  isOpen: boolean
  onClose: () => void
}

export default function CallDetailDrawer({ call, isOpen, onClose }: CallDetailDrawerProps) {
  if (!isOpen || !call) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-end">
      <div className="bg-white h-full w-96 shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-100">
          <h2 className="text-lg font-semibold text-zinc-950">Call Details</h2>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Customer Name</label>
                <p className="text-sm text-zinc-950 mt-1">{call.customerName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Phone Number</label>
                <p className="text-sm text-zinc-950 mt-1">{call.phoneNumber}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-base">Call Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Date</label>
                <p className="text-sm text-zinc-950 mt-1">{call.date}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Time</label>
                <p className="text-sm text-zinc-950 mt-1">{call.time}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Reason for Calling</label>
                <p className="text-sm text-zinc-950 mt-1">{call.reason}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-base">Call Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 italic">
                No additional notes available for this call.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-zinc-100">
          <div className="flex flex-col gap-2">
            <Button 
              variant="primary" 
              className="w-full"
              onClick={() => {
                window.location.href = `/calls/${call.id}`
                onClose()
              }}
            >
              View Full Details
            </Button>
            <div className="flex gap-2">
              <Button 
                variant="tertiary" 
                className="flex-1"
                onClick={() => {
                  toast.success(`PDF export initiated for ${call.customerName}'s call`)
                  onClose()
                }}
              >
                Export as PDF
              </Button>
              <Button 
                variant="tertiary" 
                className="flex-1"
                onClick={() => {
                  toast.info("Edit call functionality coming soon")
                  onClose()
                }}
              >
                Edit Call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}