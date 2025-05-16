import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAuthentication } from '@/hooks/use-authentication'

export function PrivateRoutesNavGuard() {
  const { user } = useAuthentication()
  const location = useLocation()

  if (!user) {
    // Redirect them to the /sign-in page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/sign-in" state={{ from: location }} />
  }

  return <Outlet />
}
