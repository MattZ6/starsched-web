import { useState } from "react";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { Mail, Sparkles } from "lucide-react";

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
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/seo";

import { SignUpForm } from "./components/form";
import { app } from "@/constants/app";

export default function SignUpPage() {
  const [companyOwnerEmail, setCompanyOwnerEmail] = useState<string | null>(null)
  const { t } = useTranslation('sign-up');

  if (!companyOwnerEmail) {
    return (
      <BasicPageWrapper>
        <BasicPageRoot>
          <SEO title={t('create-account.meta.title')} />

          <BasicPageLogoContainer>
            <Sparkles />
          </BasicPageLogoContainer>

          <BasicPageHeader>
            <BasicPageTitle>{t('create-account.page.title')}</BasicPageTitle>
            <BasicPageDescription>
              {t('create-account.page.description', { name: app.name })}
            </BasicPageDescription>
          </BasicPageHeader>

          <BasicPageBody>
            <SignUpForm onSubmit={setCompanyOwnerEmail} />
          </BasicPageBody>

          <BasicPageFooter>
            <BasicPageText>
              {t('create-account.page.sign-in.text')} <Link to="/sign-in" className="text-primary font-semibold">
                {t('create-account.page.sign-in.link.label')}
              </Link>
            </BasicPageText>
          </BasicPageFooter>
        </BasicPageRoot>
      </BasicPageWrapper>
    )
  }

  return (
    <BasicPageWrapper>
      <BasicPageRoot>
        <SEO title={t('mail-sent.meta.title')} />

        <BasicPageLogoContainer>
          <Mail />
        </BasicPageLogoContainer>

        <BasicPageHeader>
          <BasicPageTitle>{t('mail-sent.page.title')}</BasicPageTitle>
          <BasicPageDescription>
            <Trans
              t={t}
              i18nKey="mail-sent.page.description"
              values={{ email: companyOwnerEmail }}
              components={{ b: <b className="font-bold" /> }}
            />
          </BasicPageDescription>
        </BasicPageHeader>

        <BasicPageBody>
          <Button asChild>
            <Link to="/sign-in">
              {t('mail-sent.page.back-to-login.link.label')}
            </Link>
          </Button>
        </BasicPageBody>
      </BasicPageRoot>
    </BasicPageWrapper>
  )
}
