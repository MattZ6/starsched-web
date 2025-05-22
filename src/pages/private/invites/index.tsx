import { useTranslation } from "react-i18next";

import { CompanySEO } from "@/components/company-seo";

import { PageContent } from "./components/page-content";

export default function CompanyInvites() {
  const { t } = useTranslation('invites', { keyPrefix: 'invites.meta' })

  return (
    <>
      <CompanySEO title={t('title')} />

      <PageContent />
    </>
  )
}
