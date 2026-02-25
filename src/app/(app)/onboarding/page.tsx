"use client"
import { useState, useEffect, Suspense } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import OnboardingStepOne, { type StepOneFormValues } from "@/features/onboarding/components/step-one"
import OnboardingStepTwo from "@/features/onboarding/components/step-two"
import OnboardingStepThree from "@/features/onboarding/components/step-three"
import OnboardingStepFour from "@/features/onboarding/components/step-four"
import StepperDots from "@/features/onboarding/components/stepper-dots"
import { PostOnboardingScreen } from "@/components/onboarding/post-onboarding-screen"
import { APP_BACKGROUND_IMAGE } from "@/config/assets"

// Centralized onboarding data state
interface OnboardingData {
  stepOne: Partial<StepOneFormValues>
  stepTwo: { selectedPlan: "starter" | "growth" | null }
  stepThree: { 
    cardNumber: string
    nameOnCard: string
    expiry: string
    cvv: string
  }
  stepFour: {
    shopName: string
    emails: string[]
  }
}

const initialOnboardingData: OnboardingData = {
  stepOne: {},
  stepTwo: { selectedPlan: null },
  stepThree: { cardNumber: "", nameOnCard: "", expiry: "", cvv: "" },
  stepFour: { shopName: "", emails: [] }
}

function OnboardingContent() {
  const router = useRouter()
  const [step, setStep] = useState<0 | 1 | 2 | 3 | "post-onboarding">(0)
  const [onboardingData, setOnboardingData] = useState<OnboardingData>(initialOnboardingData)

  useEffect(() => {
    // Restore global background for onboarding screens
    document.body.style.backgroundImage = `url(${APP_BACKGROUND_IMAGE})`
    document.body.style.backgroundSize = "cover"
    document.body.style.backgroundRepeat = "no-repeat"
  }, [])


  const handlePostOnboardingComplete = () => {
    router.push("/overview")
  }

  // Data update handlers
  const updateStepOneData = (data: StepOneFormValues) => {
    setOnboardingData(prev => ({ ...prev, stepOne: data }))
  }

  const updateStepTwoData = (selectedPlan: "starter" | "growth") => {
    setOnboardingData(prev => ({ ...prev, stepTwo: { selectedPlan } }))
  }

  const updateStepThreeData = (data: { cardNumber: string; nameOnCard: string; expiry: string; cvv: string }) => {
    setOnboardingData(prev => ({ ...prev, stepThree: data }))
  }

  const updateStepFourData = (data: { shopName: string; emails: string[] }) => {
    setOnboardingData(prev => ({ ...prev, stepFour: data }))
  }

  // Auto-populate shop name from step 1 to step 4
  const getStepFourInitialData = () => {
    const stepOneShopName = onboardingData.stepOne.shopName || ""
    return {
      shopName: stepOneShopName || onboardingData.stepFour.shopName || "",
      emails: onboardingData.stepFour.emails || []
    }
  }


  // Show post-onboarding screen
  if (step === "post-onboarding") {
    return <PostOnboardingScreen onComplete={handlePostOnboardingComplete} />
  }

  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-0">
      <motion.div 
        className="w-full max-w-[720px] rounded-lg border bg-white/95 p-6 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08),0_4px_6px_-4px_rgba(0,0,0,0.06)]"
        layout
      >
        <AnimatePresence mode="wait">
          {step === 0 ? (
            <OnboardingStepOne 
              key="step-1" 
              initialData={onboardingData.stepOne}
              onContinue={(v: StepOneFormValues) => { 
                updateStepOneData(v)
                setStep(1) 
              }} 
            />
          ) : step === 1 ? (
            <OnboardingStepTwo 
              key="step-2" 
              initialSelectedPlan={onboardingData.stepTwo.selectedPlan}
              onBack={() => setStep(0)} 
              onContinue={(planId) => {
                updateStepTwoData(planId)
                setStep(2)
              }} 
            />
          ) : step === 2 ? (
            <OnboardingStepThree 
              key="step-3" 
              initialData={onboardingData.stepThree}
              onBack={() => setStep(1)} 
              onFinish={(data) => {
                updateStepThreeData(data)
                setStep(3)
              }} 
            />
          ) : (
            <OnboardingStepFour 
              key="step-4" 
              initialData={getStepFourInitialData()}
              onBack={() => setStep(2)} 
              onFinish={(data) => {
                updateStepFourData(data)
                setStep("post-onboarding")
              }} 
            />
          )}
        </AnimatePresence>
        <div className="mt-8 flex justify-center">
          <StepperDots total={4} current={step} />
        </div>
      </motion.div>
    </main>
  )
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OnboardingContent />
    </Suspense>
  )
}

