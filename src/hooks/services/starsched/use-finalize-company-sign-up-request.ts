import { useMutation } from "@tanstack/react-query"

import { finalizeCompanySignUpRequest } from "@/services/starsched/finalize-company-sign-up-request"

export function useFinalizeCompanySignUpRequest() {
  return useMutation({
    mutationFn: finalizeCompanySignUpRequest,
  })
}
