import { useAtomValue } from 'jotai'
import { Navigate, Outlet } from 'react-router-dom'

import { selectedCompanySlugAtom } from '@/atoms/selected-company-slug'

export function OnboardingRoutesNavGuard() {
  const selectedCompanySlug = useAtomValue(selectedCompanySlugAtom)

  if (selectedCompanySlug) {
    return <Navigate to={`/${selectedCompanySlug}`} />
  }

  return <Outlet />
}
