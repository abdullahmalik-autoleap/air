"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Phone, ArrowRight, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Image from "next/image"
import { BackgroundBeamsWithCollision } from "@/components/ui/shadcn-io/background-beams-with-collision"

interface PostOnboardingScreenProps {
  onComplete: () => void
}

export const PostOnboardingScreen = ({ onComplete }: PostOnboardingScreenProps) => {
  const router = useRouter()
  const [showSuccessTick, setShowSuccessTick] = useState(false)
  const [phoneNumber] = useState("+2 345 3455") // Dummy phone number

  useEffect(() => {
    // Clear any existing background for the beams animation
    document.body.style.backgroundImage = 'none'
    document.body.style.backgroundColor = 'transparent'
    
    // Show success tick animation after component mounts
    const timer = setTimeout(() => {
      setShowSuccessTick(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber)
      toast.success("Copied to clipboard successfully", {
        position: "bottom-center",
        style: {
          marginBottom: "20px",
        },
      })
    } catch (err) {
      console.error("Failed to copy: ", err)
      toast.error("Failed to copy to clipboard")
    }
  }

  const handleCallAndTest = () => {
    // Non-functional button for now
    toast.info("Call & Test functionality will be implemented soon")
  }

  const handleGoToDashboard = () => {
    onComplete()
    router.push("/overview")
  }

  return (
    <BackgroundBeamsWithCollision className="fixed inset-0 min-h-screen">
      {/* Main content card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        className="relative z-20 w-full max-w-[600px] mx-4 flex items-center justify-center min-h-screen"
      >
        <div className="bg-white rounded-lg shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] p-6">
          {/* Success tick icon */}
          <div className="flex justify-center mb-6">
            <AnimatePresence>
              {showSuccessTick && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 15,
                    duration: 0.6 
                  }}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center"
                >
                  <motion.div
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-green-600"
                  >
                    <Check className="w-8 h-8" strokeWidth={3} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Header text */}
          <div className="text-center mb-6">
            <h1 className="text-xl font-medium text-slate-900 mb-2">
              Your AIR Phone Number is Ready!
            </h1>
            <p className="text-base text-slate-500 leading-6">
              Share this number with your team or set up call forwarding from your shop line to make sure no customer goes unanswered.
            </p>
          </div>

          {/* Phone number display with gradient background */}
          <div className="relative mb-6 rounded-lg overflow-hidden">
            <div className="relative h-32 flex items-center justify-between px-5 py-4">
              {/* Gradient background using the image */}
              <div className="absolute inset-0">
                <Image
                  src="/images/bg-gradient-1.png"
                  alt="Gradient background"
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Content overlay */}
              <div className="relative z-10 flex items-center justify-between w-full">
                <div className="text-white flex-1">
                  <p className="text-sm font-medium text-slate-200 mb-1">
                    Your AIR Phone Number
                  </p>
                  <p className="text-3xl font-medium text-white">
                    {phoneNumber}
                  </p>
                </div>
                
                <button
                  onClick={handleCopyToClipboard}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/40 backdrop-blur-sm rounded-md transition-colors duration-200 whitespace-nowrap flex-shrink-0 ml-4"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 w-full">
            <Button
              onClick={handleCallAndTest}
              variant="tertiary"
              size="xlarge"
              className="border-[#0e7169] text-[#0e7169] hover:bg-[#F9F9F9] hover:border-[#CBD5E1] flex-1"
              leftIcon={<Phone className="w-5 h-5" />}
            >
              Call & Test Your Number
            </Button>
            
            <Button
              onClick={handleGoToDashboard}
              variant="primary"
              size="xlarge"
              className="bg-[#0e7169] hover:bg-[#0B5A52] flex-1"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Go To Dashboard
            </Button>
          </div>
        </div>
      </motion.div>
    </BackgroundBeamsWithCollision>
  )
}
