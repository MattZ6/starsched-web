import type { Company } from "@starsched/sdk"

import { CompanyLink } from "./components"

type Props = {
  companies: Company[]
}

export function CompaniesList({ companies }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {companies.map(company => (
        <CompanyLink key={company.id} company={company} />
      ))}
    </div>
  )
}
