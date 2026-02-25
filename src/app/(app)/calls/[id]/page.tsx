"use client"

import { useParams, useRouter } from "next/navigation"
import { Calendar, Clock, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Sidebar from "@/components/dashboard/sidebar"

// Mock data for the call details
const mockCallDetails = {
  id: "call_1",
  customerName: "Alex Jason",
  phoneNumber: "(555) 123-4567",
  date: "August 21, 2025",
  time: "2:00pm",
  duration: "1m 30s",
  reason: "Brake issue",
  keyTopics: [
    "Brake issue",
    "Appointment scheduling", 
    "Contact confirmation",
    "Callback reminder",
    "Vehicle details"
  ],
  callContext: `During the call, Sarah Johnson reported an issue with her 2018 Toyota Corolla's brakes and requested an appointment at Oakwood Auto Repair.

She confirmed availability for Wednesday at 2:00 pm. AiR captured her contact number and noted the service request for brake inspection and repair.

A callback reminder was created for the service advisor to confirm the appointment and provide an estimate before the visit.`,
  transcript: [
    { speaker: "agent", text: "Hi, thank you for calling Oakwood Auto Repair. How can I help you today?" },
    { speaker: "customer", text: "Hi, I think my brakes are squeaking on my Corolla. I'd like to get it checked." },
    { speaker: "agent", text: "Of course, I can help with that. Could I have your name, please?" },
    { speaker: "customer", text: "It's Sarah Johnson." },
    { speaker: "agent", text: "Thank you, Sarah. And just to confirm, are we calling from 416-555-2398?" },
    { speaker: "customer", text: "Yes, that's right." },
    { speaker: "agent", text: "Great. We can schedule a brake inspection for you. What day works best?" },
    { speaker: "customer", text: "Wednesday afternoon would be good." },
    { speaker: "agent", text: "We have an opening at 2:00 pm Wednesday. Does that work?" },
    { speaker: "customer", text: "Perfect." },
    { speaker: "agent", text: "I'll note your request for a brake inspection. Anything else I can help with?" },
    { speaker: "customer", text: "That's all, thank you." },
    { speaker: "agent", text: "You're welcome, Sarah. We look forward to helping you on Wednesday." }
  ]
}

export default function CallDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const callId = params.id as string

  // For now, we'll use mock data. In a real app, you'd fetch this based on callId
  const call = mockCallDetails

  const handleBackToCalls = () => {
    router.push("/calls")
  }

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
          <div className="flex flex-col gap-6 items-start justify-start relative size-full">
            {/* Breadcrumb */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink 
                    href="/calls" 
                    className="text-base hover:text-[#0E7169]"
                    onClick={handleBackToCalls}
                  >
                    Calls
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-base font-medium text-zinc-950">
                    {call.customerName}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Two Column Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
              {/* Left Column - General Details, Key Topics, Call Context */}
              <div className="flex flex-col gap-6">
                {/* General Details Card */}
                <Card className="w-full gap-3" style={{ padding: '20px' }}>
                  <CardTitle className="text-lg font-medium text-zinc-950" style={{ marginBottom: '8px' }}>General Details</CardTitle>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-zinc-950">Date: {call.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-zinc-950">Time: {call.time}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-zinc-950">Duration: {call.duration}</span>
                    </div>
                  </div>
                </Card>

                {/* Key Topics Card */}
                <Card className="w-full gap-3" style={{ padding: '20px' }}>
                  <div className="flex items-center gap-2" style={{ marginBottom: '8px' }}>
                    <CardTitle className="text-lg font-medium text-zinc-950">Key Topics</CardTitle>
                    <Star className="h-4 w-4 text-purple-400" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {call.keyTopics.map((topic, index) => (
                      <Badge 
                        key={index}
                        variant="secondary"
                        className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-0"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </Card>

                {/* Call Context Card */}
                <Card className="w-full gap-3" style={{ padding: '20px' }}>
                  <div className="flex items-center gap-2" style={{ marginBottom: '8px' }}>
                    <CardTitle className="text-lg font-medium text-zinc-950">Call Context</CardTitle>
                    <Star className="h-4 w-4 text-purple-400" />
                  </div>
                  <div className="text-sm text-zinc-950 leading-relaxed">
                    {call.callContext.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-3 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Right Column - Call Transcript */}
              <div>
                <Card className="w-full h-full gap-3" style={{ padding: '20px' }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: '8px' }}>
                    <CardTitle className="text-lg font-medium text-zinc-950">Call Transcript</CardTitle>
                    <span className="text-sm text-gray-500">2 min read</span>
                  </div>
                  <div className="space-y-3">
                    {call.transcript.map((line, index) => (
                      <div key={index} className="flex gap-3">
                        <div 
                          className={`w-1 h-4 rounded-full mt-1 flex-shrink-0 ${
                            line.speaker === 'customer' ? 'bg-green-500' : 'bg-gray-400'
                          }`}
                        />
                        <p className="text-sm text-zinc-950 leading-relaxed">{line.text}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
