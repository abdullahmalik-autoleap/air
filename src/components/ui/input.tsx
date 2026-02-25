import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputVariants = cva(
  "flex h-11 w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none ring-offset-background transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input hover:border-input/80 focus-visible:ring-primary/20",
        error: "border-destructive focus-visible:ring-destructive/20",
        success: "border-green-500 focus-visible:ring-green-500/20",
      },
      size: {
        default: "h-11 px-3 py-2",
        sm: "h-9 px-2 py-1 text-xs",
        lg: "h-12 px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  error?: boolean
  success?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, error, success, ...props }, ref) => {
    const inputVariant = error ? "error" : success ? "success" : variant

    return (
      <input
        className={cn(inputVariants({ variant: inputVariant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input, inputVariants }


