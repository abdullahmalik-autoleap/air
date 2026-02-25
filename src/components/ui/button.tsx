import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0E7169]/30 active:scale-[0.98] px-3",
  {
    variants: {
      variant: {
        // Primary CTA: filled solid #0E7169, text/icon color white
        primary:
          "bg-[#0E7169] text-white shadow-sm hover:bg-[#0B5A52] active:bg-[#084A43] focus-visible:ring-[#0E7169]/30",
        // Secondary CTA: filled solid #F2FDFA, text/icon color #0E7169
        secondary:
          "bg-[#F2FDFA] text-[#0E7169] shadow-sm hover:bg-[#E8F9F5] active:bg-[#DDF5F0] focus-visible:ring-[#0E7169]/30",
        // Tertiary CTA: transparent with border #E2E8F0, text/icon color #0E7169
        tertiary:
          "bg-transparent text-[#0E7169] border border-[#E2E8F0] hover:bg-[#F9F9F9] hover:border-[#CBD5E1] active:bg-[#F0F0F0] active:border-[#94A3B8] focus-visible:ring-[#0E7169]/30",
        // Legacy variants for backward compatibility
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary_legacy:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        xsmall: "h-8 text-[14px] [&_svg]:size-4", // 32px height, 14px text, 16px icons
        small: "h-9 text-[14px] [&_svg]:size-4", // 36px height, 14px text, 16px icons
        medium: "h-10 text-[14px] [&_svg]:size-4", // 40px height, 14px text, 16px icons
        large: "h-11 text-[14px] [&_svg]:size-4", // 44px height, 14px text, 16px icons
        xlarge: "h-12 text-[16px] [&_svg]:size-5", // 48px height, 16px text, 20px icons
        xxlarge: "h-[52px] text-[16px] [&_svg]:size-5", // 52px height, 16px text, 20px icons
        // Legacy sizes for backward compatibility
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
      layout: {
        default: "",
        fullWidth: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
      layout: "default",
    },
  }
)

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, layout, asChild = false, leftIcon, rightIcon, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, layout, className }))}
        ref={ref}
        data-slot="button"
        {...props}
      >
        {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        {children && <span>{children}</span>}
        {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
