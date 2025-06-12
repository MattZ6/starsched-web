import { cn } from "@/lib/utils"
import type { ComponentPropsWithoutRef } from "react"

type PrivatePageRootProps = ComponentPropsWithoutRef<'main'>

function PrivatePageRoot({ className, ...props }: PrivatePageRootProps) {
  return <section className={cn("flex flex-col gap-8 p-8 motion-safe:animate-in fade-in-0 duration-300", className)} {...props} />
}

type PrivatePageHeaderProps = ComponentPropsWithoutRef<'header'>

function PrivatePageHeader({ className, ...props }: PrivatePageHeaderProps) {
  return <header className={cn('flex flex-col gap-1', className)} {...props} />
}

type PrivatePageTitleProps = ComponentPropsWithoutRef<'h2'>

function PrivatePageTitle({ className, ...props }: PrivatePageTitleProps) {
  return <h1 className={cn("text-3xl font-semibold tracking-tight transition-colors", className)} {...props} />
}

type PrivatePageDescriptionProps = ComponentPropsWithoutRef<'p'>

function PrivatePageDescription({ className, ...props }: PrivatePageDescriptionProps) {
  return <p className={cn("leading-7 text-muted-foreground whitespace-break-spaces", className)} {...props} />
}

type PrivatePageBodyProps = ComponentPropsWithoutRef<'div'>

function PrivatePageBody({ className, ...props }: PrivatePageBodyProps) {
  return <div className={cn('flex flex-col gap-4', className)} {...props} />
}

export {
  PrivatePageRoot,
  PrivatePageHeader,
  PrivatePageTitle,
  PrivatePageDescription,
  PrivatePageBody,
}
