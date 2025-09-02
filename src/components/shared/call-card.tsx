type CallCardProps = {
  caller: string
  timestamp: string
  status: "answered" | "missed" | "voicemail"
  duration?: string
}

export default function CallCard({ caller, timestamp, status, duration }: CallCardProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{caller}</p>
        <p className="text-xs text-muted-foreground">{timestamp}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-muted px-2 py-1 text-xs capitalize">{status}</span>
        {duration ? <span className="text-xs text-muted-foreground">{duration}</span> : null}
      </div>
    </div>
  )
}


