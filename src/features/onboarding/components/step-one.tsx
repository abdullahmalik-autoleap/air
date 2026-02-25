"use client"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { VALIDATION_RULES } from "@/constants"

const stepOneSchema = z.object({
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
})

export type StepOneFormValues = z.infer<typeof stepOneSchema>

interface StepOneProps {
  onContinue?: (values: StepOneFormValues) => void
  initialData?: Partial<StepOneFormValues>
}

export default function OnboardingStepOne({ onContinue, initialData }: StepOneProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<StepOneFormValues>({
    resolver: zodResolver(stepOneSchema),
    mode: "onChange",
    defaultValues: {
      name: initialData?.name || "",
      shopName: initialData?.shopName || "",
      address: initialData?.address || "",
      phone: initialData?.phone || "",
    },
  })

  const handleFormSubmit = (values: StepOneFormValues) => {
    onContinue?.(values)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">Tell us about yourself</h2>
        <p className="text-muted-foreground">
          We&apos;ll use this information to personalize your AIR experience.
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="name">
              What&apos;s your name?
            </label>
            <Input
              id="name"
              placeholder="Enter your full name"
              error={!!errors.name}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="shopName">
              What&apos;s your shop&apos;s name?
            </label>
            <Input
              id="shopName"
              placeholder="e.g. Fast Autos"
              error={!!errors.shopName}
              {...register("shopName")}
            />
            {errors.shopName && (
              <p className="text-xs text-destructive">{errors.shopName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="address">
              Where&apos;s your shop located?
            </label>
            <Input
              id="address"
              placeholder="e.g. East Street, Toronto, Ontario"
              error={!!errors.address}
              {...register("address")}
            />
            {errors.address && (
              <p className="text-xs text-destructive">{errors.address.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="phone">
              What&apos;s your shop&apos;s phone number?
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="e.g. +1 234 5678"
              error={!!errors.phone}
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-xs text-destructive">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            disabled={!isValid}
            variant="primary"
            size="xlarge"
            layout="fullWidth"
            rightIcon={<span aria-hidden>→</span>}
            aria-label="Continue"
          >
            Continue
          </Button>
        </div>
      </form>
    </motion.div>
  )
}


