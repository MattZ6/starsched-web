import { useTranslation } from 'react-i18next'

import { LoadingIndicator } from '@/components/ui/loading-indicator'
import {
  BasicPageDescription,
  BasicPageHeader,
  BasicPageLogoContainer,
  BasicPageRoot,
  BasicPageTitle,
  BasicPageWrapper,
} from '@/components/ui/basic-page'

export function Loading() {
  const { t } = useTranslation('common', { keyPrefix: 'private-nav-guard.profile-check.loading' })

  return (
    <BasicPageWrapper>
      <BasicPageRoot>
        <BasicPageLogoContainer>
          <LoadingIndicator />
        </BasicPageLogoContainer>

        <BasicPageHeader>
          <BasicPageTitle>{t('title')}</BasicPageTitle>
          <BasicPageDescription>{t('description')}</BasicPageDescription>
        </BasicPageHeader>
      </BasicPageRoot>
    </BasicPageWrapper>
  )
}
