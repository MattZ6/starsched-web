import { useTranslation } from "react-i18next";

import { CompanySEO } from "@/components/company-seo";

import { PageContent } from "./components/page-content";

export default function PatientsPage() {
  const { t } = useTranslation('patients', { keyPrefix: 'patients.meta' })

  return (
    <>
      <CompanySEO title={t('title')} />

      <PageContent />
    </>
  )
}
