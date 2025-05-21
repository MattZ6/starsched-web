import type { ReactNode } from "react"

import { Tooltip as TooltipRoot, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

type Props = {
  message: string
  children: ReactNode
}

export function Tooltip({ children, message }: Props) {
  return (
    <TooltipRoot>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{message}</TooltipContent>
    </TooltipRoot>
  )
}
