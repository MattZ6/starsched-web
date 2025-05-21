import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { getCompanyMembers, type Input as GetCompanyMemebersInput } from "@/services/starsched/get-company-members"

type Input = {
  companyId: string
  itemsPerPage: number
  page: number
  sortBy?: GetCompanyMemebersInput['sortBy']
  orderBy?: GetCompanyMemebersInput['orderBy']
}

export function useGetCompanyMembers(input: Input) {
  const { companyId, page, itemsPerPage, sortBy, orderBy } = input

  const offset = (page - 1) * itemsPerPage

  return useQuery({
    queryKey: ['company-members', companyId, sortBy, orderBy, itemsPerPage, page],
    staleTime: 1 * 24 * 60 * 60 * 1000, // 👈 1 dia
    placeholderData: keepPreviousData,
    queryFn: ({ signal }) => getCompanyMembers({
      companyId,
      limit: itemsPerPage,
      offset,
      sortBy,
      orderBy,
      abortSignal: signal,
    })
  })
}
