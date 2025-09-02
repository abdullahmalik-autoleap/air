type ForwardingBannerProps = {
  forwardingNumber: string
}

export default function ForwardingBanner({ forwardingNumber }: ForwardingBannerProps) {
  return (
    <div className="rounded-lg border bg-amber-50 p-4 text-amber-900">
      <div className="text-sm">
        Calls are currently forwarded to <span className="font-medium">{forwardingNumber}</span>.
      </div>
    </div>
  )
}


