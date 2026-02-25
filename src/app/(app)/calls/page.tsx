"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Clock, ChevronDown, MoreVertical, Eye, FileText, Trash2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"
import CallDetailDrawer from "@/components/shared/call-detail-drawer"
import Sidebar from "@/components/dashboard/sidebar"

interface Call {
  id: string
  customerName: string
  phoneNumber: string
  date: string
  time: string
  reason: string
}

// Generate 25 realistic shop call examples
const generateMockCalls = (): Call[] => {
  const customerNames = [
    "Sarah Conor", "Alex Jason", "John Doe", "Emily Smith", "Michael Brown",
    "Jessica Wilson", "David Martinez", "Lisa Anderson", "Robert Taylor", "Maria Garcia",
    "James Johnson", "Jennifer Davis", "Christopher Lee", "Amanda White", "Daniel Clark",
    "Ashley Rodriguez", "Matthew Lewis", "Stephanie Walker", "Andrew Hall", "Nicole Young",
    "Kevin King", "Rachel Green", "Brandon Adams", "Samantha Baker", "Tyler Wright"
  ]

  const phoneNumbers = [
    "(555) 123-4567", "(555) 987-6543", "(555) 654-3210", "(555) 321-0987", "(555) 456-7890",
    "(555) 789-0123", "(555) 234-5678", "(555) 345-6789", "(555) 456-7890", "(555) 567-8901",
    "(555) 678-9012", "(555) 789-0123", "(555) 890-1234", "(555) 901-2345", "(555) 012-3456",
    "(555) 123-4567", "(555) 234-5678", "(555) 345-6789", "(555) 456-7890", "(555) 567-8901",
    "(555) 678-9012", "(555) 789-0123", "(555) 890-1234", "(555) 901-2345", "(555) 012-3456"
  ]

  const reasons = [
    "Oil Change", "Brake Inspection", "Tire Rotation", "Battery Replacement", "Alignment Check",
    "Engine Diagnostic", "Transmission Service", "Coolant Flush", "Air Filter Replacement", "Spark Plug Change",
    "Wheel Balancing", "Suspension Repair", "Exhaust System", "AC Service", "Timing Belt",
    "Power Steering", "Fuel System Clean", "Radiator Repair", "Clutch Service", "Brake Pad Replacement"
  ]

  const dates = [
    "July 24, 2025", "July 25, 2025", "July 26, 2025", "July 27, 2025", "July 28, 2025",
    "July 29, 2025", "July 30, 2025", "July 31, 2025", "August 1, 2025", "August 2, 2025",
    "August 3, 2025", "August 4, 2025", "August 5, 2025", "August 6, 2025", "August 7, 2025",
    "August 8, 2025", "August 9, 2025", "August 10, 2025", "August 11, 2025", "August 12, 2025",
    "August 13, 2025", "August 14, 2025", "August 15, 2025", "August 16, 2025", "August 17, 2025"
  ]

  const times = [
    "8:30am", "9:15am", "10:00am", "10:45am", "11:30am", "12:15pm", "1:00pm", "1:45pm", "2:30pm", "3:15pm",
    "4:00pm", "4:45pm", "5:30pm", "6:15pm", "7:00pm", "7:45pm", "8:30am", "9:15am", "10:00am", "10:45am",
    "11:30am", "12:15pm", "1:00pm", "1:45pm", "2:30pm"
  ]

  return Array.from({ length: 25 }, (_, i) => ({
    id: `call_${i + 1}`,
    customerName: customerNames[i],
    phoneNumber: phoneNumbers[i],
    date: dates[i],
    time: times[i],
    reason: reasons[i % reasons.length]
  }))
}

const mockCalls = generateMockCalls()

export default function CallsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCalls, setSelectedCalls] = useState<string[]>([])
  const [selectedCall, setSelectedCall] = useState<Call | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const itemsPerPage = 17
  const totalPages = Math.ceil(mockCalls.length / itemsPerPage)
  
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentCalls = mockCalls.slice(startIndex, endIndex)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCalls(currentCalls.map(call => call.id))
    } else {
      setSelectedCalls([])
    }
  }

  const handleSelectCall = (callId: string, checked: boolean) => {
    if (checked) {
      setSelectedCalls(prev => [...prev, callId])
    } else {
      setSelectedCalls(prev => prev.filter(id => id !== callId))
    }
  }

  const handleViewDetails = (call: Call) => {
    setSelectedCall(call)
    setIsDrawerOpen(true)
  }

  const handleExportPDF = (call: Call) => {
    toast.success(`PDF export initiated for ${call.customerName}'s call`)
    // TODO: Implement PDF export
  }

  const handleDeleteCall = (call: Call) => {
    toast.success(`Call record for ${call.customerName} has been deleted`)
    // TODO: Implement delete functionality
  }

  const handleRowClick = (call: Call) => {
    // Navigate to call details page instead of opening drawer
    window.location.href = `/calls/${call.id}`
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
    setSelectedCall(null)
  }

  const isAllSelected = currentCalls.length > 0 && selectedCalls.length === currentCalls.length

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
        <div className="relative z-10 flex-1 overflow-y-auto p-6">
          <div className="flex flex-col gap-5 items-start justify-start relative size-full">
            {/* Header */}
            <div className="flex items-center justify-between relative shrink-0 w-full">
              <div className="flex flex-col gap-1 items-start justify-center relative shrink-0">
                <h1 className="text-xl font-medium text-zinc-950">Your Calls</h1>
              </div>
              <div className="bg-white flex gap-1.5 h-8 items-center justify-center px-3 py-0 relative rounded-md shrink-0 border border-zinc-100 shadow-sm">
                <Clock className="size-3.5 text-[#0e7169]" />
                <span className="text-sm font-semibold text-[#0e7169]">Last month</span>
                <ChevronDown className="size-4 text-[#0e7169]" />
              </div>
            </div>

      {/* Table */}
      <Card className="basis-0 bg-white grow min-h-px min-w-px relative rounded-md shrink-0 w-full border border-zinc-100 shadow-sm !p-0 !gap-0">
        <div className="flex flex-col items-start justify-start overflow-hidden relative size-full">
          <div className="basis-0 bg-white flex flex-col grow items-start justify-start min-h-px min-w-px overflow-hidden relative rounded-md shrink-0 w-full">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 border-b border-zinc-100">
                  <TableHead className="w-12 pl-3">
                    <Checkbox 
                      className="rounded"
                      checked={isAllSelected}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-sm font-medium text-gray-500 px-2">
                    Customer&apos;s Name
                  </TableHead>
                  <TableHead className="text-sm font-medium text-gray-500 px-2">
                    Customer&apos;s Phone No.
                  </TableHead>
                  <TableHead className="text-sm font-medium text-gray-500 px-2">
                    Date
                  </TableHead>
                  <TableHead className="text-sm font-medium text-gray-500 px-2">
                    Time
                  </TableHead>
                  <TableHead className="text-sm font-medium text-gray-500 px-2">
                    Reason For Calling
                  </TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentCalls.map((call) => (
                  <TableRow 
                    key={call.id} 
                    className="border-b border-zinc-100 hover:bg-gray-50/50 cursor-pointer"
                    onClick={() => handleRowClick(call)}
                  >
                    <TableCell className="pl-3">
                      <Checkbox 
                        className="rounded"
                        checked={selectedCalls.includes(call.id)}
                        onCheckedChange={(checked) => handleSelectCall(call.id, checked as boolean)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </TableCell>
                    <TableCell className="font-medium text-zinc-950 px-2">
                      {call.customerName}
                    </TableCell>
                    <TableCell className="text-zinc-950 px-2">
                      {call.phoneNumber}
                    </TableCell>
                    <TableCell className="text-zinc-950 px-2">
                      {call.date}
                    </TableCell>
                    <TableCell className="text-zinc-950 px-2">
                      {call.time}
                    </TableCell>
                    <TableCell className="px-2">
                      <span className="inline-flex items-center rounded-md bg-white border border-zinc-100 shadow-sm px-1.5 py-0.5 text-xs font-medium text-zinc-500">
                        {call.reason}
                      </span>
                    </TableCell>
                    <TableCell className="px-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical className="h-4 w-4 text-zinc-500" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => window.location.href = `/calls/${call.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleExportPDF(call)}>
                            <FileText className="mr-2 h-4 w-4" />
                            Export as PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteCall(call)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete call record
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex gap-2 items-center justify-start px-3 py-2 relative shrink-0 w-full border-t border-zinc-100">
            <div className="flex gap-2.5 grow items-center justify-start relative shrink-0">
              <span className="text-sm text-zinc-500">
                {currentCalls.length} of {mockCalls.length} row(s)
              </span>
            </div>
            <div className="flex gap-8 items-center justify-start relative shrink-0">
              <span className="text-sm font-medium text-zinc-950">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex gap-2 items-center justify-start relative shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 opacity-50"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(1)}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 opacity-50"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(totalPages)}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

            {/* Call Detail Drawer */}
            <CallDetailDrawer
              call={selectedCall}
              isOpen={isDrawerOpen}
              onClose={handleCloseDrawer}
            />
          </div>
        </div>
      </div>
    </div>
  )
}


