"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { mockSignIn, mockSignUp } from "../lib/mock"
import { VALIDATION_RULES } from "@/constants"

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email(VALIDATION_RULES.EMAIL.MESSAGE),
  password: z
    .string()
    .min(1, "Password is required")
    .min(VALIDATION_RULES.PASSWORD.MIN_LENGTH, VALIDATION_RULES.PASSWORD.MESSAGE),
})

const registerSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(VALIDATION_RULES.NAME.MIN_LENGTH, VALIDATION_RULES.NAME.MESSAGE)
    .max(VALIDATION_RULES.NAME.MAX_LENGTH, VALIDATION_RULES.NAME.MESSAGE),
  shopName: z
    .string()
    .min(1, "Shop name is required")
    .min(2, "Shop name must be at least 2 characters"),
  address: z
    .string()
    .min(1, "Address is required")
    .min(5, "Please enter a complete address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(VALIDATION_RULES.PHONE.PATTERN, VALIDATION_RULES.PHONE.MESSAGE),
  email: z
    .string()
    .min(1, "Email is required")
    .email(VALIDATION_RULES.EMAIL.MESSAGE),
  password: z
    .string()
    .min(1, "Password is required")
    .min(VALIDATION_RULES.PASSWORD.MIN_LENGTH, VALIDATION_RULES.PASSWORD.MESSAGE),
})

type LoginFormValues = z.infer<typeof loginSchema>
type RegisterFormValues = z.infer<typeof registerSchema>

interface AuthFormProps {
  mode: "sign-in" | "sign-up"
  onSuccess?: () => void
}

export default function AuthForm({ mode, onSuccess }: AuthFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const isSignUp = mode === "sign-up"
  
  const loginForm = useForm<LoginFormValues>({ 
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  })
  
  const registerForm = useForm<RegisterFormValues>({ 
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  })
  
  const form = isSignUp ? registerForm : loginForm
  const { register, handleSubmit, formState: { errors, isValid }, reset } = form

  const handleFormSubmit = async (values: LoginFormValues | RegisterFormValues) => {
    setError(null)
    setIsSubmitting(true)
    
    try {
      if (isSignUp) {
        const registerData = values as RegisterFormValues
        await mockSignUp({
          email: registerData.email,
          password: registerData.password,
          name: registerData.name,
          shopName: registerData.shopName,
          address: registerData.address,
          phone: registerData.phone,
        })
      } else {
        const loginData = values as LoginFormValues
        await mockSignIn({
          email: loginData.email,
          password: loginData.password,
        })
      }
      onSuccess?.()
      reset()
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Something went wrong"
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {isSignUp && (
        <>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="name">
              Full Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              error={!!(errors as Record<string, any>).name}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              {...(register as any)("name")}
            />
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {(errors as Record<string, any>).name && (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              <p className="text-xs text-destructive">{(errors as Record<string, any>).name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="shopName">
              Shop Name
            </label>
            <Input
              id="shopName"
              type="text"
              placeholder="Enter your shop name"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              error={!!(errors as Record<string, any>).shopName}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              {...(register as any)("shopName")}
            />
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {(errors as Record<string, any>).shopName && (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              <p className="text-xs text-destructive">{(errors as Record<string, any>).shopName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="address">
              Shop Address
            </label>
            <Input
              id="address"
              type="text"
              placeholder="Enter your shop address"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              error={!!(errors as Record<string, any>).address}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              {...(register as any)("address")}
            />
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {(errors as Record<string, any>).address && (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              <p className="text-xs text-destructive">{(errors as Record<string, any>).address.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="phone">
              Phone Number
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              error={!!(errors as Record<string, any>).phone}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              {...(register as any)("phone")}
            />
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {(errors as Record<string, any>).phone && (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              <p className="text-xs text-destructive">{(errors as Record<string, any>).phone.message}</p>
            )}
          </div>
        </>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="email">
          Email Address
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          error={!!errors.email}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          {...(register as any)("email")}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="password">
          Password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          error={!!errors.password}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          {...(register as any)("password")}
        />
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting || !isValid}
        variant="primary"
        size="large"
        layout="fullWidth"
      >
        {isSubmitting 
          ? "Please wait..." 
          : isSignUp 
            ? "Create Account" 
            : "Sign In"
        }
      </Button>
    </form>
  )
}


