import { useMutation, useQueryClient } from "@tanstack/react-query"

import { createCompanyInvite } from "@/services/starsched/create-company-invite"

import { EventUtils } from "@/utils/event"

const eventUtils = new EventUtils()
const RESET_INVITES_LIST_EVENT_NAME = 'reset-company-invitations-list'

export function useCreateCompanyInvite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCompanyInvite,
    onSuccess: (_, input) => {
      eventUtils.emit(RESET_INVITES_LIST_EVENT_NAME)

      queryClient.refetchQueries({
        queryKey: ['company-invitations', input.companyId]
      })
    }
  })
}
