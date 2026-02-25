"use client"

import { ArrowRight, ExternalLink } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

interface Call {
  id: string
  customerName: string
  phoneNumber: string
  date: string
  time: string
  reason: string
}

interface CallsTableProps {
  calls?: Call[]
}

const mockCalls: Call[] = [
  {
    id: "1",
    customerName: "Sarah Conor",
    phoneNumber: "(555) 123-4567",
    date: "July 24, 2025",
    time: "2:50pm",
    reason: "Oil Change"
  },
  {
    id: "2",
    customerName: "Alex Jason",
    phoneNumber: "(555) 123-4567",
    date: "July 24, 2025",
    time: "8:40am",
    reason: "Brake Inspection"
  },
  {
    id: "3",
    customerName: "John Doe",
    phoneNumber: "(555) 987-6543",
    date: "July 25, 2025",
    time: "10:30am",
    reason: "Tire Rotation"
  },
  {
    id: "4",
    customerName: "Emily Smith",
    phoneNumber: "(555) 654-3210",
    date: "July 25, 2025",
    time: "1:15pm",
    reason: "Battery Replacement"
  },
  {
    id: "5",
    customerName: "Michael Brown",
    phoneNumber: "(555) 321-0987",
    date: "July 26, 2025",
    time: "3:00pm",
    reason: "Alignment Check"
  }
]

export default function CallsTable({ calls = mockCalls }: CallsTableProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base font-semibold text-zinc-950">
          Last 5 Calls
        </CardTitle>
        <button className="inline-flex items-center gap-2 h-8 px-3 rounded-md border border-[#E2E8F0] bg-white text-[#0E7169] hover:bg-[#F9F9F9] hover:border-[#CBD5E1] transition-colors">
          <span className="text-sm font-semibold">View All Calls</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </CardHeader>
      <CardContent className="px-6 pt-4 pb-0">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50">
                <TableHead className="w-12">
                  <Checkbox className="rounded" />
                </TableHead>
                <TableHead className="text-sm font-medium text-gray-500">
                  Customer&apos;s Name
                </TableHead>
                <TableHead className="text-sm font-medium text-gray-500">
                  Customer&apos;s Phone No.
                </TableHead>
                <TableHead className="text-sm font-medium text-gray-500">
                  Date
                </TableHead>
                <TableHead className="text-sm font-medium text-gray-500">
                  Time
                </TableHead>
                <TableHead className="text-sm font-medium text-gray-500">
                  Reason For Calling
                </TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {calls.map((call) => (
                <TableRow key={call.id} className="border-b border-zinc-100">
                  <TableCell>
                    <Checkbox className="rounded" />
                  </TableCell>
                  <TableCell className="font-medium text-zinc-950">
                    {call.customerName}
                  </TableCell>
                  <TableCell className="text-zinc-950">
                    {call.phoneNumber}
                  </TableCell>
                  <TableCell className="text-zinc-950">
                    {call.date}
                  </TableCell>
                  <TableCell className="text-zinc-950">
                    {call.time}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600">
                      {call.reason}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ExternalLink className="h-4 w-4 text-green-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
