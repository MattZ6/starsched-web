import { useQuery } from "@tanstack/react-query"

import { getCompanyPlan } from "@/services/starsched/get-company-plan"

type Input = {
  companyId?: string
}

export function useGetCompanyPlan(input: Input) {
  const { companyId } = input

  return useQuery({
    queryKey: ['company', companyId, 'plan'],
    staleTime: 1 * 24 * 60 * 60 * 1000, // 👈 1 dia
    enabled: !!companyId,
    queryFn: ({ signal }) => getCompanyPlan({
      companyId: companyId!,
      abortSignal: signal,
    })
  })
}
