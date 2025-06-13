type Props = {
  currentCount: number
  limit: number
}

export function Progress({ currentCount, limit }: Props) {
  const patientsPercent = Math.min((currentCount / limit) * 100, 100)

  return (
    <div className="w-full h-2 rounded-full bg-accent relative overflow-hidden" aria-hidden>
      <div className={`absolute inset-0 z-[1] h-2 rounded-full bg-accent-foreground transition-all`} style={{ width: `${patientsPercent}%` }} />
    </div>
  )
}
