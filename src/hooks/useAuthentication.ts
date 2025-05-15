import { useContext } from 'react'

import { AuthenticationContext } from '@/contexts/authentication'

export function useAuthentication() {
  return useContext(AuthenticationContext)
}
