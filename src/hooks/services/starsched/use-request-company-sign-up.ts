import { useMutation } from "@tanstack/react-query"

import { requestCompanySignUp } from "@/services/starsched/request-company-sign-up"

export function useRequestCompanySignUp() {
  return useMutation({
    mutationFn: requestCompanySignUp,
  })
}
