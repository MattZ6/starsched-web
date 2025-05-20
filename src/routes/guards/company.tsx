import { useEffect, useState } from 'react'
import { useSetAtom } from 'jotai'
import { Navigate, Outlet, useParams } from 'react-router-dom'

import { selectedCompanySlugAtom } from '@/atoms/selected-company-slug'

import { useGetMyCompanies } from '@/hooks/services/starsched/use-get-my-companies'
import { BasicPageBody, BasicPageDescription, BasicPageHeader, BasicPageLogoContainer, BasicPageRoot, BasicPageTitle, BasicPageWrapper } from '@/components/ui/basic-page'
import { LoadingIndicator } from '@/components/ui/loading-indicator'

type Intialization = 'pending' | 'can_view' | 'cannot_view'

type Params = {
  companySlug: string
}

export function CompanyRoutesNavGuard() {
  const { isLoading, error, data } = useGetMyCompanies()
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

  if (isLoading) {
    return <BasicPageWrapper>
      <BasicPageRoot>
        <BasicPageBody >
          <BasicPageLogoContainer>
            <LoadingIndicator />
          </BasicPageLogoContainer>

          <BasicPageHeader>
            <BasicPageTitle>Carregando clínicas...</BasicPageTitle>
            <BasicPageDescription>Aguarde alguns instantes</BasicPageDescription>
          </BasicPageHeader>
        </BasicPageBody>
      </BasicPageRoot>
    </BasicPageWrapper>
  }

  if (error) {
    // TODO: Implementar
    return <span>deu ruim... tentar novamente</span>
  }

  if (initialization === 'pending') {
    // TODO: Implementar
    return <span>inicializando...</span>
  }

  if (initialization === 'cannot_view') {
    return <Navigate to="/" />
  }

  return <Outlet />
}
