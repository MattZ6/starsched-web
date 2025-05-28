import { useMutation, useQueryClient } from "@tanstack/react-query"

import { updateCompanyInviteRole } from "@/services/starsched/update-company-invite-role"

export function useUpdateCompanyInviteRole() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateCompanyInviteRole,
    onSuccess: (_, input) => queryClient.refetchQueries({
      queryKey: ['company-invitations', input.companyId]
    })
  })
}
