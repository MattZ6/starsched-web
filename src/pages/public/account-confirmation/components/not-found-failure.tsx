import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { SearchX } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SEO } from "@/components/seo"
import {
  BasicPageBody,
  BasicPageDescription,
  BasicPageFooter,
  BasicPageHeader,
  BasicPageLogoContainer,
  BasicPageRoot,
  BasicPageTitle,
  BasicPageWrapper,
} from "@/components/ui/basic-page"

export function NotFoundFailure() {
  const { t } = useTranslation('account-confirmation', { keyPrefix: 'confirmation-code-not-found' })

  return (
    <BasicPageWrapper>
      <BasicPageRoot>
        <SEO title={t('meta.title')} />

        <BasicPageLogoContainer>
          <SearchX />
        </BasicPageLogoContainer>

        <BasicPageHeader>
          <BasicPageTitle>{t('page.title')}</BasicPageTitle>
          <BasicPageDescription>{t('page.description')}</BasicPageDescription>
        </BasicPageHeader>

        <BasicPageBody>
          <Button asChild>
            <Link to="/sign-up" replace>
              {t('page.request-again.link.label')}
            </Link>
          </Button>
        </BasicPageBody>

        <BasicPageFooter>
          <Link to="/sign-in" replace className="font-medium text-primary">
            {t('page.back-to-login.link.label')}
          </Link>
        </BasicPageFooter>
      </BasicPageRoot>
    </BasicPageWrapper>
  )
}
