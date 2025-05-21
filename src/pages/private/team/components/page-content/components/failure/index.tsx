type Props = {
  error: Error
  onTryAgain: () => void
}

export function Failure({ error }: Props) {
  return (
    <span>{error.message}</span>
  )
}
