import { useMutation } from "@tanstack/react-query"

import { deleteCompanyInvite } from "@/services/starsched/delete-company-invite"

import { EventUtils } from "@/utils/event"

const eventUtils = new EventUtils()
const RESET_INVITES_LIST_EVENT_NAME = 'reset-company-invitations-list'

export function useDeleteCompanyInvite() {

  return useMutation({
    mutationFn: deleteCompanyInvite,
    onSuccess: () => eventUtils.emit(RESET_INVITES_LIST_EVENT_NAME)
  })
}
