import type { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

type Props = {
  icon: LucideIcon
  title: string
  description: string
  buttonText: string
  onAction: () => void
}

export function ErrorTemplate({ icon: Icon, title, description, buttonText, onAction }: Props) {
  return (
    <div className="flex flex-col items-center gap-4 border border-border rounded-md p-6">
      <div className="flex items-center justify-center size-10 border border-border rounded-md">
        <Icon />
      </div>

      <div className="flex flex-col gap-1 max-w-[400px]">
        <span className="font-bold text-2xl text-center text-foreground">
          {title}
        </span>
        <p className="text-base text-center text-muted-foreground whitespace-break-spaces">
          {description}
        </p>
      </div>

      <Button type="button" onClick={onAction}>
        {buttonText}
      </Button>
    </div>
  )
}
