import { useTranslation } from "react-i18next";

import { CompanySEO } from "@/components/company-seo";

import { PageContent } from "./components/page-content";

export default function TeamPage() {
  const { t } = useTranslation('members', { keyPrefix: 'members.meta' })
  return (
    <>
      <CompanySEO title={t('title')} />
      <PageContent />
    </>
  )
}
