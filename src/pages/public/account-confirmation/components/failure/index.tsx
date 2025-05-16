import { useTranslation } from "react-i18next";
import { CircleAlert } from "lucide-react";
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

type Props = {
  onTryAgain: () => void;
}

export function Failure({ onTryAgain }: Props) {
  const { t } = useTranslation('account-confirmation', { keyPrefix: 'get-account-confirmation-data-error' })

  return (
    <BasicPageWrapper>
      <BasicPageRoot>
        <SEO title={t('meta.title')} />

        <BasicPageLogoContainer>
          <CircleAlert />
        </BasicPageLogoContainer>

        <BasicPageHeader>
          <BasicPageTitle>{t('page.title')}</BasicPageTitle>
          <BasicPageDescription>{t('page.description')}</BasicPageDescription>
        </BasicPageHeader>

        <BasicPageBody>
          <Button type="button" onClick={onTryAgain}>
            {t('page.try-again.button.label')}
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
