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
import { useTranslation } from 'react-i18next'

export function Loading() {
  const { t } = useTranslation('common', { keyPrefix: 'private-nav-guard.profile-check.loading' })

  return (
    <BasicPageWrapper>
      <BasicPageRoot>
        <BasicPageBody className="items-center">
          <BasicPageLogoContainer>
            <LoadingIndicator />
          </BasicPageLogoContainer>

          <BasicPageHeader>
            <BasicPageTitle>{t('title')}</BasicPageTitle>
            <BasicPageDescription>{t('description')}</BasicPageDescription>
          </BasicPageHeader>
        </BasicPageBody>
      </BasicPageRoot>
    </BasicPageWrapper>
  )
}
