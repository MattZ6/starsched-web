import { Navigate, Outlet } from 'react-router-dom'
import type { CompanyMember } from '@starsched/sdk'

import { useSelectedCompany } from '@/hooks/use-selected-company'

type Props = {
  allowedRoles: CompanyMember['role'][]
}

export function CompanyRoleNavGuard({ allowedRoles }: Props) {
  const selectedCompany = useSelectedCompany()

  if (!selectedCompany) {
    return <Navigate to="/" />
  }

  const allowed = allowedRoles.some(role => role === selectedCompany.role)

  if (!allowed) {
    return <Navigate to={`/${selectedCompany.slug}/team`} />
  }

  return <Outlet />
}
