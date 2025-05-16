import { type ReactNode, Suspense, useLayoutEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { ErrorBoundary } from '@/components/error-boundary'

type Props = {
  errorComponent?: ReactNode
  loadingComponent?: ReactNode
}

export function SuspenseRouterOutlet({
  errorComponent,
  loadingComponent,
}: Props) {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    setTimeout(
      () => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }),
      0,
    )
  }, [pathname])

  return (
    <ErrorBoundary key={pathname} fallback={errorComponent ?? null}>
      <Suspense fallback={loadingComponent ?? null}>
        <Outlet />
      </Suspense>
    </ErrorBoundary>
  )
}
