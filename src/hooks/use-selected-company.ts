import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { useGetMyCompanies } from "./services/starsched/use-get-my-companies";

type Params = {
  companySlug: string;
}

export function useSelectedCompany() {
  const { companySlug } = useParams<Params>()
  const { data } = useGetMyCompanies()

  const selectedCompany = useMemo(() => {
    return data?.find(c => c.slug === companySlug)
  }, [companySlug, data])

  return selectedCompany
}
