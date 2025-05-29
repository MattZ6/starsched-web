import { useMutation, useQueryClient } from "@tanstack/react-query"

import { deleteCompanyInvite } from "@/services/starsched/delete-company-invite"

export function useDeleteCompanyInvite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteCompanyInvite,
    onSuccess: (_, input) => queryClient.refetchQueries({
      queryKey: ['company-invitations', input.companyId]
    })
  })
}
