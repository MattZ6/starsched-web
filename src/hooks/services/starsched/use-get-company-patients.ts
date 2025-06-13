import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { getCompanyPatients, type Input as GetCompanyPatientsInput } from "@/services/starsched/get-company-patients"

type Input = {
  companyId: string
  itemsPerPage: number
  page: number
  sortBy?: GetCompanyPatientsInput['sortBy']
  orderBy?: GetCompanyPatientsInput['orderBy']
}

export function useGetCompanyPatients(input: Input) {
  const { companyId, page, itemsPerPage, sortBy, orderBy } = input

  const offset = (page - 1) * itemsPerPage

  return useQuery({
    queryKey: ['company-patients', companyId, sortBy, orderBy, itemsPerPage, page],
    staleTime: 1 * 24 * 60 * 60 * 1000, // 👈 1 dia
    placeholderData: keepPreviousData,
    queryFn: ({ signal }) => getCompanyPatients({
      companyId,
      limit: itemsPerPage,
      offset,
      sortBy,
      orderBy,
      abortSignal: signal,
    })
  })
}
