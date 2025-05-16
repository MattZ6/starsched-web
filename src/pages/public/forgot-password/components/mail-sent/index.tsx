import { Mail } from "lucide-react";
import { Trans, useTranslation } from "react-i18next";
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
  BasicPageText,
  BasicPageTitle,
  BasicPageWrapper,
} from "@/components/ui/basic-page";

type Props = {
  email: string
}

export function MailSent({ email }: Props) {
  const { t } = useTranslation('forgot-password', { keyPrefix: 'email-sent' })

  return (
    <BasicPageWrapper>
      <BasicPageRoot>
        <SEO title={t('meta.title')} />

        <BasicPageLogoContainer>
          <Mail />
        </BasicPageLogoContainer>

        <BasicPageHeader>
          <BasicPageTitle>{t('page.title')}</BasicPageTitle>
          <BasicPageDescription>
            <Trans
              t={t}
              i18nKey="page.description"
              values={{ email }}
              components={{ b: <b className="font-bold" /> }}
            />
          </BasicPageDescription>
        </BasicPageHeader>

        <BasicPageBody>
          <Button type="button">
            {t('page.open-email-app.button.label')}
          </Button>
        </BasicPageBody>

        <BasicPageFooter>
          <BasicPageText>
            <Link to="/sign-in" className="text-primary font-semibold">
              {t('page.back-to-login.link.label')}
            </Link>
          </BasicPageText>
        </BasicPageFooter>
      </BasicPageRoot>
    </BasicPageWrapper>
  )
}
