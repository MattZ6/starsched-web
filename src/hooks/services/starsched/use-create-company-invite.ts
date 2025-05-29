import { useMutation, useQueryClient } from "@tanstack/react-query"

import { createCompanyInvite } from "@/services/starsched/create-company-invite"

export function useCreateCompanyInvite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCompanyInvite,
    onSuccess: (_, input) => queryClient.refetchQueries({
      queryKey: ['company-invitations', input.companyId]
    })
  })
}
