type PhoneNumberCardProps = {
  number: string
  helper?: string
}

export default function PhoneNumberCard({ number, helper }: PhoneNumberCardProps) {
  return (
    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
      <div className="text-sm text-muted-foreground">AiR Phone Number</div>
      <div className="mt-2 text-2xl font-semibold tracking-tight">{number}</div>
      {helper ? <p className="mt-1 text-xs text-muted-foreground">{helper}</p> : null}
    </div>
  )
}


