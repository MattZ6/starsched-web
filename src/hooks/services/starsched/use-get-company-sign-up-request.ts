import { useQuery } from "@tanstack/react-query"

import { getCompanySignUpRequest } from "@/services/starsched/get-company-sign-up-request"

type Input = {
  code: string;
}

export function useGetCompanySignUpRequest(input: Input) {
  const { code } = input

  return useQuery({
    queryKey: ['get-company-sign-up-request', code],
    staleTime: 1 * 24 * 60 * 60 * 1000, // 👈 1 dia
    queryFn: ({ signal }) => getCompanySignUpRequest({
      id: code,
      abortSignal: signal
    })
  })
}
