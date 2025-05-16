import { useQuery } from "@tanstack/react-query"

import { getCompanySignUpRequest } from "@/services/starsched/get-company-sign-up-request"

type Input = {
  code: string;
}

export function useGetCompanySignUpRequest(input: Input) {
  const { code } = input

  return useQuery({
    queryKey: ['get-company-sign-up-request', code],
    refetchOnWindowFocus: false,
    queryFn: ({ signal }) => getCompanySignUpRequest({
      id: code,
      abortSignal: signal
    })
  })
}
