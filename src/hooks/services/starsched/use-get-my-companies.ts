import { useQuery } from "@tanstack/react-query"

import { getMyCompanies } from "@/services/starsched/get-my-companies"

export function useGetMyCompanies() {
  return useQuery({
    queryKey: ['my-companies'],
    staleTime: 1 * 24 * 60 * 60 * 1000, // 👈 1 dia
    queryFn: ({ signal }) => getMyCompanies({ abortSignal: signal })
  })
}
