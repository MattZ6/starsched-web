import type { Company } from "@starsched/sdk"

import { CompanyButton } from "./components/company-button"

type Props = {
  companies: Company[]
}

export function CompaniesList({ companies }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {companies.map(company => (
        <CompanyButton key={company.id} company={company} />
      ))}
    </div>
  )
}
