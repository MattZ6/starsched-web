import { useMutation } from "@tanstack/react-query"

import { createCompanyInvite } from "@/services/starsched/create-company-invite"

import { EventUtils } from "@/utils/event"

const eventUtils = new EventUtils()
const RESET_INVITES_LIST_EVENT_NAME = 'reset-company-invitations-list'

export function useCreateCompanyInvite() {
  return useMutation({
    mutationFn: createCompanyInvite,
    onSuccess: () => eventUtils.emit(RESET_INVITES_LIST_EVENT_NAME)
  })
}
