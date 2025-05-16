import { Loader2Icon } from "lucide-react"
import { useTranslation } from "react-i18next"

import { SEO } from "@/components/seo"
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
          {/* TODO: Criar um componente de loading com svg */}
          <Loader2Icon />
        </BasicPageLogoContainer>

        <BasicPageHeader>
          <BasicPageTitle>{t('page.title')}</BasicPageTitle>
          <BasicPageDescription>{t('page.description')}</BasicPageDescription>
        </BasicPageHeader>
      </BasicPageRoot>
    </BasicPageWrapper>
  )
}
