import { useMutation, useQueryClient } from "@tanstack/react-query"

import { deleteCompanyInvite } from "@/services/starsched/delete-company-invite"

import { EventUtils } from "@/utils/event"

const eventUtils = new EventUtils()
const RESET_INVITES_LIST_EVENT_NAME = 'reset-company-invitations-list'

export function useDeleteCompanyInvite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteCompanyInvite,
    onSuccess: (_, input) => {
      eventUtils.emit(RESET_INVITES_LIST_EVENT_NAME)

      queryClient.refetchQueries({
        queryKey: ['company-invitations', input.companyId]
      })
    }
  })
}
