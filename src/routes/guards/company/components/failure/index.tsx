import { AlertCircle, Bug } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { GetMyCompanies } from '@starsched/sdk'

import { useAuthentication } from '@/hooks/use-authentication'

import { isStarSchedError } from '@/utils/is-starsched-error'

import {
  BasicPageBody,
  BasicPageDescription,
  BasicPageHeader,
  BasicPageLogoContainer,
  BasicPageRoot,
  BasicPageTitle,
  BasicPageWrapper,
} from '@/components/ui/basic-page'
import { Button } from '@/components/ui/button'

type Props = {
  error: Error
  onTryAgain: () => void
}

export function Failure({ error, onTryAgain }: Props) {
  const { t } = useTranslation('common', { keyPrefix: 'company-nav-guard.failure' })
  const { signOut } = useAuthentication()

  if (isStarSchedError<GetMyCompanies.Failure>(error)) {
    if (
      error.code === 'user.not.exists' ||
      error.code === 'token.expired' ||
      error.code === 'token.invalid' ||
      error.code === 'token.not.provided'
    ) {
      signOut()

      return null
    }

    if (error.code === 'internal') {
      return (
        <BasicPageWrapper>
          <BasicPageRoot>
            <BasicPageLogoContainer>
              <AlertCircle />
            </BasicPageLogoContainer>

            <BasicPageHeader>
              <BasicPageTitle>{t('internal.title')}</BasicPageTitle>
              <BasicPageDescription>{t('internal.description')}</BasicPageDescription>
            </BasicPageHeader>

            <BasicPageBody>
              <Button type="button" onClick={onTryAgain}>
                {t('try-again.button.label')}
              </Button>
              <Button type="button" variant="ghost" onClick={signOut}>
                {t('sign-out.button.label')}
              </Button>
            </BasicPageBody>
          </BasicPageRoot>
        </BasicPageWrapper>
      )
    }
  }

  return (
    <BasicPageWrapper>
      <BasicPageRoot>
        <BasicPageLogoContainer>
          <Bug />
        </BasicPageLogoContainer>

        <BasicPageHeader>
          <BasicPageTitle>{t('exception.title')}</BasicPageTitle>
          <BasicPageDescription>{t('exception.description')}</BasicPageDescription>
        </BasicPageHeader>

        <BasicPageBody>
          <Button type="button" onClick={onTryAgain}>
            {t('try-again.button.label')}
          </Button>
          <Button type="button" variant="ghost" onClick={signOut}>
            {t('sign-out.button.label')}
          </Button>
        </BasicPageBody>
      </BasicPageRoot>
    </BasicPageWrapper>
  )
}
