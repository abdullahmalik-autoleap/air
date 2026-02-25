"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Silk from "@/components/Silk"
import { useState, useEffect } from "react"

export default function SignUpPage() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [animationReady, setAnimationReady] = useState(false)

  useEffect(() => {
    // Remove global background for this page
    document.body.style.backgroundImage = 'none'
    document.body.style.backgroundColor = 'transparent'
    
    // Set loaded state after a brief delay to ensure smooth transition
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    // Set animation ready state after silk animation has time to initialize
    const animationTimer = setTimeout(() => {
      setAnimationReady(true)
    }, 500)

    return () => {
      clearTimeout(timer)
      clearTimeout(animationTimer)
    }
  }, [])

  return (
    <main className="relative min-h-dvh flex items-center justify-center p-4 bg-transparent">
      {/* Full-width Silk background */}
      <div className="absolute inset-0">
        <Silk
          speed={4.5}
          scale={0.9}
          color="#5CBCA3"
          noiseIntensity={1}
          rotation={0}
        />
      </div>
      
      {/* Centered signup card with fade-in animation */}
      <div 
        className={`relative z-10 w-full max-w-md transition-all duration-700 ease-out ${
          isLoaded && animationReady 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="rounded-lg border bg-white p-6 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]">
          <div className="flex flex-col items-center gap-6">
            {/* Logo */}
            <div className="flex items-center justify-center" aria-label="AIR AutoLeap logo">
              <Image src="/icons/logo-signup.svg" alt="AIR AutoLeap logo" height={44} width={0} className="h-11 w-auto" />
            </div>

            {/* Title */}
            <h1 className="text-2xl font-medium text-slate-900">Create Account</h1>

            {/* Sign Up Buttons */}
            <div className="w-full space-y-4">
              <Button
                type="button"
                variant="tertiary"
                size="xxlarge"
                layout="fullWidth"
                leftIcon={<Image src="/icons/logo-autoleap.svg" alt="Autoleap" width={20} height={20} />}
                aria-label="Sign up with Autoleap"
                className="h-14 text-zinc-950 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]"
              >
                Sign up with Autoleap
              </Button>

              <Button
                type="button"
                variant="tertiary"
                size="xxlarge"
                layout="fullWidth"
                leftIcon={<Image src="/icons/logo-google.svg" alt="Google" width={20} height={20} />}
                aria-label="Sign up with Google"
                onClick={() => router.push("/onboarding")}
                className="h-14 text-zinc-950 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]"
              >
                Sign up with Google
              </Button>
            </div>

            {/* Login Link */}
            <p className="text-sm text-slate-500 font-semibold">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-[#0e7169] underline underline-offset-2"
                aria-label="Log in"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}


