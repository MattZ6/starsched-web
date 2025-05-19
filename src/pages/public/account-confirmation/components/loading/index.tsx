import { useTranslation } from "react-i18next"

import { SEO } from "@/components/seo"
import { LoadingIndicator } from "@/components/ui/loading-indicator"
import {
  BasicPageDescription,
  BasicPageHeader,
  BasicPageLogoContainer,
  BasicPageRoot,
  BasicPageTitle,
  BasicPageWrapper,
} from "@/components/ui/basic-page"

export function Loading() {
  const { t } = useTranslation('account-confirmation', { keyPrefix: 'loading' })

  return (
    <BasicPageWrapper>
      <BasicPageRoot>
        <SEO title={t('meta.title')} />

        <BasicPageLogoContainer>
          <LoadingIndicator />
        </BasicPageLogoContainer>

        <BasicPageHeader>
          <BasicPageTitle>{t('page.title')}</BasicPageTitle>
          <BasicPageDescription>{t('page.description')}</BasicPageDescription>
        </BasicPageHeader>
      </BasicPageRoot>
    </BasicPageWrapper>
  )
}
