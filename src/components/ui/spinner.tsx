import { cn } from "@/lib/cn"

interface SpinnerProps {
  className?: string
}

export const Spinner = ({ className }: SpinnerProps) => {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-current border-t-transparent",
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}