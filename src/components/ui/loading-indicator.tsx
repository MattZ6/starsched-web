import { cn } from "@/lib/utils"

type Props = React.ComponentProps<"svg">

export function LoadingIndicator({ className, ...props }: Props) {
  return (
    <svg
      viewBox="0 0 50 50"
      className={cn("size-6 animate-spinner-rotate", className)}
      {...props}
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        className="stroke-primary animate-spinner-dash"
      />
    </svg>
  )
}
