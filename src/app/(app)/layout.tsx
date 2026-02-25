import type { ReactNode } from "react"
import "../globals.css"

type AppLayoutProps = {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-dvh bg-transparent text-foreground">
      <div className="w-full">
        {children}
      </div>
    </div>
  )
}


