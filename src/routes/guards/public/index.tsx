import { Navigate, Outlet } from 'react-router-dom'

import { useAuthentication } from '@/hooks/use-authentication'

export function PublicRoutesNavGuard() {
  const { user } = useAuthentication()

  if (user) {
    return <Navigate to="/" />
  }

  return <Outlet />
}
