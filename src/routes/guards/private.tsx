import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAuthentication } from '@/hooks/use-authentication'
import { useGetMyProfile } from '@/hooks/services/starsched/use-get-my-profile'

import { LoadingIndicator } from '@/components/ui/loading-indicator'
import {
  BasicPageBody,
  BasicPageDescription,
  BasicPageHeader,
  BasicPageLogoContainer,
  BasicPageRoot,
  BasicPageTitle,
  BasicPageWrapper,
} from '@/components/ui/basic-page'

function ProfileCheck() {
  const { isLoading, error } = useGetMyProfile()

  if (isLoading) {
    return <BasicPageWrapper>
      <BasicPageRoot>
        <BasicPageBody >
          <BasicPageLogoContainer>
            <LoadingIndicator />
          </BasicPageLogoContainer>

          <BasicPageHeader>
            <BasicPageTitle>Carregando perfil...</BasicPageTitle>
            <BasicPageDescription>Aguarde alguns instantes</BasicPageDescription>
          </BasicPageHeader>
        </BasicPageBody>
      </BasicPageRoot>
    </BasicPageWrapper>
  }

  if (error) {
    return <BasicPageWrapper>
      <BasicPageRoot>
        <BasicPageBody >
          <BasicPageLogoContainer>

          </BasicPageLogoContainer>

          <BasicPageHeader>
            <BasicPageTitle>Falha</BasicPageTitle>
            <BasicPageDescription>Falha ao carregar o seu perfil</BasicPageDescription>
          </BasicPageHeader>
        </BasicPageBody>
      </BasicPageRoot>
    </BasicPageWrapper>
  }

  return <Outlet />
}

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

  return <ProfileCheck />
}
