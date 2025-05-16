import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

type BasicPageFooterProps = ComponentPropsWithoutRef<'div'>

function BasicPageFooter({ className, ...props }: BasicPageFooterProps) {
  return <div className={cn('flex flex-col gap-4', className)} {...props} />
}

type BasicPageBodyProps = ComponentPropsWithoutRef<'div'>

function BasicPageBody({ className, ...props }: BasicPageBodyProps) {
  return <div className={cn('flex flex-col gap-4 w-full', className)} {...props} />
}

type BasicPageDescriptionProps = ComponentPropsWithoutRef<'p'>

function BasicPageDescription({ className, ...props }: BasicPageDescriptionProps) {
  return <p className={cn("text-base text-center text-muted-foreground whitespace-break-spaces", className)} {...props} />
}

type BasicPageHeaderProps = ComponentPropsWithoutRef<'header'>

function BasicPageHeader({ className, ...props }: BasicPageHeaderProps) {
  return <header className={cn('flex flex-col items-center gap-3', className)} {...props} />
}

type BasicPageLogoContainerProps = ComponentPropsWithoutRef<'div'>

function BasicPageLogoContainer({
  className,
  ...props
}: BasicPageLogoContainerProps) {

  return <div className={cn("flex items-center justify-center size-12 border rounded-md border-border bg-background shadow-xs text-foreground", className)} {...props} />
}

type BasicPageRootProps = ComponentPropsWithoutRef<'section'>

function BasicPageRoot({ className, ...props }: BasicPageRootProps) {
  return <section className={cn("flex flex-col items-center gap-8 w-full mx-auto max-w-full sm:max-w-[420px] motion-safe:animate-in fade-in-0 duration-300", className)} {...props} />
}

type BasicPageTextProps = ComponentPropsWithoutRef<'p'>

function BasicPageText({ className, ...props }: BasicPageTextProps) {
  return <p className={cn("text-base text-center text-muted-foreground", className)} {...props} />
}

type BasicPageTitleProps = ComponentPropsWithoutRef<'p'>

function BasicPageTitle({ className, ...props }: BasicPageTitleProps) {
  return <h1 className={cn("font-bold text-3xl text-center text-foreground", className)} {...props} />
}

type BasicPageWrapperProps = ComponentPropsWithoutRef<'div'>

function BasicPageWrapper({ className, ...props }: BasicPageWrapperProps) {
  return <div className={cn("flex flex-col py-12 px-6 max-w-7xl mx-auto", className)} {...props} />
}

export {
  BasicPageWrapper,
  BasicPageRoot,
  BasicPageLogoContainer,
  BasicPageHeader,
  BasicPageTitle,
  BasicPageDescription,
  BasicPageBody,
  BasicPageFooter,
  BasicPageText,
}
