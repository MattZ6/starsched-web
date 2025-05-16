import { use } from 'react'

import { AuthenticationContext } from '@/contexts/authentication'

export function useAuthentication() {
  return use(AuthenticationContext)
}
