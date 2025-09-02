type MinutesMeterProps = {
  usedMinutes: number
  includedMinutes: number
}

export default function MinutesMeter({ usedMinutes, includedMinutes }: MinutesMeterProps) {
  const percentage = Math.min(100, Math.round((usedMinutes / includedMinutes) * 100))
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Minutes</span>
        <span className="font-medium">
          {usedMinutes}/{includedMinutes}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}


