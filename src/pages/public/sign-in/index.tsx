import { useTranslation } from 'react-i18next'
import { Sparkles } from 'lucide-react'

import { SEO } from '@/components/seo'
import {
  BasicPageBody,
  BasicPageDescription,
  BasicPageFooter,
  BasicPageHeader,
  BasicPageLogoContainer,
  BasicPageRoot,
  BasicPageTitle,
  BasicPageWrapper,
} from '@/components/ui/basic-page'

export default function SignInPage() {
  const { t } = useTranslation('sign-in')

  return (
    <BasicPageWrapper>
      <BasicPageRoot>
        <SEO title={t('meta.title')} />

        <BasicPageLogoContainer>
          <Sparkles />
        </BasicPageLogoContainer>

        <BasicPageHeader>
          <BasicPageTitle>{t('page.title')}</BasicPageTitle>
          <BasicPageDescription>{t('page.description')}</BasicPageDescription>
        </BasicPageHeader>

        <BasicPageBody>
          {/* <SignInForm /> */}
        </BasicPageBody>

        <BasicPageFooter>
          {/* <BasicPageText>
            <BasicPageLink href="/forgot-password">
              {t('forgot-password.link.label')}
            </BasicPageLink>
          </BasicPageText> */}

          {/* <BasicPageText>
            {t('page.create-account.text')} <BasicPageLink href="/sign-up">
              {t('page.create-account.link.label')}
            </BasicPageLink>
          </BasicPageText> */}
        </BasicPageFooter>
      </BasicPageRoot>
    </BasicPageWrapper>
  )
}
