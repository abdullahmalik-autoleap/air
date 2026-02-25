import { cn } from "@/lib/utils"
import { forwardRef } from "react"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
  children?: React.ReactNode
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size = "md", children, ...props }, ref) => {
    const sizeClasses = {
      sm: "h-6 w-6",
      md: "h-8 w-8", 
      lg: "h-12 w-12"
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex shrink-0 overflow-hidden rounded-full",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Avatar.displayName = "Avatar"

export interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const AvatarFallback = forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex h-full w-full items-center justify-center rounded-full bg-muted",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarFallback }
