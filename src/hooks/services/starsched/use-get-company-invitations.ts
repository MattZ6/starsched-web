import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { getCompanyInvitations, type Input as GetCompanyInvitesInput } from "@/services/starsched/get-company-invitations"

type Input = {
  companyId: string
  itemsPerPage: number
  page: number
  sortBy?: GetCompanyInvitesInput['sortBy']
  orderBy?: GetCompanyInvitesInput['orderBy']
}

export function useGetCompanyInvitations(input: Input) {
  const { companyId, page, itemsPerPage, sortBy, orderBy } = input

  const offset = (page - 1) * itemsPerPage

  return useQuery({
    queryKey: ['company-invitations', companyId, sortBy, orderBy, itemsPerPage, page],
    staleTime: 1 * 24 * 60 * 60 * 1000, // 👈 1 dia
    placeholderData: keepPreviousData,
    queryFn: ({ signal }) => getCompanyInvitations({
      companyId,
      limit: itemsPerPage,
      offset,
      sortBy,
      orderBy,
      abortSignal: signal,
    })
  })
}
