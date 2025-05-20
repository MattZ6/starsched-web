import { Navigate, useLocation } from 'react-router-dom'

import { useAuthentication } from '@/hooks/use-authentication'

import { ProfileCheck } from './components/profile-check'

export function PrivateRoutesNavGuard() {
  const { user } = useAuthentication()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} />
  }

  return <ProfileCheck />
}
