import { useEffect, useState } from 'react'
import { useSetAtom } from 'jotai'
import { Navigate, Outlet, useParams } from 'react-router-dom'

import { selectedCompanySlugAtom } from '@/atoms/selected-company-slug'

import { useGetMyCompanies } from '@/hooks/services/starsched/use-get-my-companies'

import { Initializing } from './components/initializing'
import { Failure } from './components/failure'

type Intialization = 'pending' | 'can_view' | 'cannot_view'

type Params = {
  companySlug: string
}

export function CompanyRoutesNavGuard() {
  const { error, refetch, data } = useGetMyCompanies()
  const setSelectedCompanySlug = useSetAtom(selectedCompanySlugAtom)
  const { companySlug } = useParams<Params>()
  const [initialization, setInitialization] = useState<Intialization>('pending')

  useEffect(() => {
    function check() {
      if (!data) {
        return;
      }

      const isValidCompanySlug = data?.some(
        company => company.slug === companySlug
      )

      if (isValidCompanySlug) {
        setInitialization('can_view')
        setSelectedCompanySlug(companySlug!)
      } else {
        setSelectedCompanySlug(null)
        setInitialization('cannot_view')
      }
    }

    check()
  }, [companySlug, data, setSelectedCompanySlug])

  if (error) {
    return <Failure error={error} onTryAgain={refetch} />
  }

  if (initialization === 'pending') {
    return <Initializing />
  }

  if (initialization === 'cannot_view') {
    return <Navigate to="/" />
  }

  return <Outlet />
}
