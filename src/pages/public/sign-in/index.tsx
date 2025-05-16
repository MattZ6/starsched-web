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
  BasicPageText,
  BasicPageTitle,
  BasicPageWrapper,
} from '@/components/ui/basic-page'

import { SignInForm } from './components/form'
import { Link } from 'react-router-dom'

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
          <SignInForm />
        </BasicPageBody>

        <BasicPageFooter>
          {/* <BasicPageText>
            <BasicPageLink href="/forgot-password">
              {t('forgot-password.link.label')}
            </BasicPageLink>
          </BasicPageText> */}

          <BasicPageText>
            {t('page.create-account.text')} <Link to="/sign-up" className="text-primary font-semibold">
              {t('page.create-account.link.label')}
            </Link>
          </BasicPageText>
        </BasicPageFooter>
      </BasicPageRoot>
    </BasicPageWrapper>
  )
}
