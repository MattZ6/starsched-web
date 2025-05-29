import { useMutation } from "@tanstack/react-query"

import { resendCompanyInvite } from "@/services/starsched/resend-company-invite"

import { EventUtils } from "@/utils/event"

const eventUtils = new EventUtils()
const REFETCH_INVITES_PAGE_EVENT_NAME = 'refetch-company-invitations-page'

export function useResendCompanyInvite() {
  return useMutation({
    mutationFn: resendCompanyInvite,
    onSuccess: () => eventUtils.emit(REFETCH_INVITES_PAGE_EVENT_NAME)
  })
}
