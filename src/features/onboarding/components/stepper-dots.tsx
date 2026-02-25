type StepperDotsProps = {
  total: number
  current: number
}

export default function StepperDots({ total, current }: StepperDotsProps) {
  const dots = Array.from({ length: total })
  return (
    <div className="flex items-center justify-center gap-2" aria-label={`Step ${current + 1} of ${total}`}>
      {dots.map((_, index) => {
        const isActive = index === current
        return (
          <span
            key={index}
            className={`${isActive ? "h-2 w-5 rounded-full bg-[#0e7169]" : "h-2 w-2 rounded-full bg-slate-300"}`}
            aria-current={isActive ? "step" : undefined}
          />
        )
      })}
    </div>
  )
}


