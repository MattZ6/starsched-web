import { useSelectedCompany } from "@/hooks/use-selected-company";

import { SEO } from "@/components/seo";

type Props = {
  title: string;
}

export function CompanySEO({ title }: Props) {
  const selectedCompany = useSelectedCompany()

  let pageTitle = title

  if (selectedCompany) {
    pageTitle += ` – ${selectedCompany.name}`
  }

  return <SEO title={pageTitle} />
}
