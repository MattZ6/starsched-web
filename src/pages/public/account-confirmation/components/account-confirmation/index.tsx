import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { UserRoundPen } from "lucide-react";

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
import { SEO } from "@/components/seo";

import { CompanySignUpConfirmationForm } from "./components/form";

type Props = {
  code: string
  companyName: string
  ownerName: string
  ownerEmail: string
}

export function AccountConfirmation({ code, companyName, ownerEmail, ownerName }: Props) {
  const { t } = useTranslation('account-confirmation', { keyPrefix: 'account-confirmation' })

  return (
    <BasicPageWrapper>
      <BasicPageRoot>
        <SEO title={t('meta.title')} />

        <BasicPageLogoContainer>
          <UserRoundPen />
        </BasicPageLogoContainer>

        <BasicPageHeader>
          <BasicPageTitle>{t('page.title')}</BasicPageTitle>
          <BasicPageDescription>
            <Trans
              t={t}
              i18nKey="page.description"
              values={{ companyName }}
              components={{ b: <b className="font-bold" /> }}
            />
          </BasicPageDescription>
        </BasicPageHeader>

        <BasicPageBody>
          <CompanySignUpConfirmationForm
            code={code}
            ownerName={ownerName}
            ownerEmail={ownerEmail}
          />
        </BasicPageBody>

        <BasicPageFooter>
          <Link to="/sign-in" className="font-medium text-primary">
            {t('page.back-to-login.link.label')}
          </Link>
        </BasicPageFooter>
      </BasicPageRoot>
    </BasicPageWrapper>
  )
}
