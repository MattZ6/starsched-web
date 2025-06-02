type Props = {
  pendingCount: number
  currentCount: number
  limit: number
}

export function Progress({ pendingCount, currentCount, limit }: Props) {
  const allMembersCount = currentCount + pendingCount

  const pendingInvitePercent = Math.min((allMembersCount / limit) * 100, 100)
  const membersPercent = Math.min((currentCount / limit) * 100, 100)

  return (
    <div className="w-full h-2 rounded-full bg-accent relative overflow-hidden" aria-hidden>
      <div className={`absolute inset-0 z-[0] h-2 rounded-full bg-accent-foreground/15 transition-all`} style={{ width: `${pendingInvitePercent}%` }} />
      <div className={`absolute inset-0 z-[1] h-2 rounded-full bg-accent-foreground transition-all`} style={{ width: `${membersPercent}%` }} />
    </div>
  )
}
