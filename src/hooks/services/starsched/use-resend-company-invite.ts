import { useMutation, useQueryClient } from "@tanstack/react-query"

import { resendCompanyInvite } from "@/services/starsched/resend-company-invite"

export function useResendCompanyInvite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: resendCompanyInvite,
    onSuccess: (_, input) => queryClient.refetchQueries({
      queryKey: ['company-invitations', input.companyId]
    })
  })
}
