import { useTranslation } from "react-i18next";
import { TimerOff } from "lucide-react";
import { Link } from "react-router-dom";

import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import {
  BasicPageBody,
  BasicPageDescription,
  BasicPageFooter,
  BasicPageHeader,
  BasicPageLogoContainer,
  BasicPageRoot,
  BasicPageTitle,
  BasicPageWrapper,
} from "@/components/ui/basic-page";

export function ExpiredFailure() {
  const { t } = useTranslation('account-confirmation', { keyPrefix: 'confirmation-code-expired' })

  return (
    <BasicPageWrapper>
      <BasicPageRoot>
        <SEO title={t('meta.title')} />

        <BasicPageLogoContainer>
          <TimerOff />
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
