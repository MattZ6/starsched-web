import type { Company } from "@starsched/sdk"
import { Building } from "lucide-react"
import { useTranslation } from "react-i18next"

import { SEO } from "@/components/seo"
import {
  BasicPageBody,
  BasicPageDescription,
  BasicPageHeader,
  BasicPageLogoContainer,
  BasicPageRoot,
  BasicPageTitle,
  BasicPageWrapper,
} from "@/components/ui/basic-page"

import { CompaniesList } from "./components/companies"
import { CreateCompanyButton } from "./components/create-company-button"

type Props = {
  companies: Company[]
}

export function Onboarding({ companies }: Props) {
  const { t } = useTranslation('onboarding', { keyPrefix: 'select-company' })

  return (
    <BasicPageWrapper>
      <BasicPageRoot>
        <SEO title={t('meta.title')} />

        <BasicPageLogoContainer>
          <Building />
        </BasicPageLogoContainer>

        <BasicPageHeader>
          <BasicPageTitle>{t('page.title')}</BasicPageTitle>
          <BasicPageDescription>{t('page.description', { count: companies.length })}</BasicPageDescription>
        </BasicPageHeader>

        <BasicPageBody>
          {!!companies.length && (
            <>
              <CompaniesList companies={companies} />
              <hr className="w-[20%] self-center my-2" />
            </>
          )}

          <CreateCompanyButton />
        </BasicPageBody>
      </BasicPageRoot>
    </BasicPageWrapper>
  )
}
