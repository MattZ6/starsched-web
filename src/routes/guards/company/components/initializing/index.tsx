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

export function Initializing() {
  const { t } = useTranslation('common', { keyPrefix: 'company-nav-guard.initializing' })

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
