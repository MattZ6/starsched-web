import { KeyRound } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { SEO } from "@/components/seo";
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

import { ForgotPasswordForm } from "./components/form";

type Props = {
  onSend: (email: string) => void
}

export function ForgotPassword({ onSend }: Props) {
  const { t } = useTranslation('forgot-password', { keyPrefix: 'forgot' })

  return (
    <BasicPageWrapper>
      <BasicPageRoot>
        <SEO title={t('meta.title')} />

        <BasicPageLogoContainer>
          <KeyRound />
        </BasicPageLogoContainer>

        <BasicPageHeader>
          <BasicPageTitle>{t('page.title')}</BasicPageTitle>
          <BasicPageDescription>{t('page.description')}</BasicPageDescription>
        </BasicPageHeader>

        <BasicPageBody>
          <ForgotPasswordForm onSend={onSend} />
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
