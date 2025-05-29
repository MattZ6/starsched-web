import { useMutation } from "@tanstack/react-query"

import { updateCompanyInviteRole } from "@/services/starsched/update-company-invite-role"

import { EventUtils } from "@/utils/event"

const eventUtils = new EventUtils()
const REFETCH_INVITES_PAGE_EVENT_NAME = 'refetch-company-invitations-page'

export function useUpdateCompanyInviteRole() {
  return useMutation({
    mutationFn: updateCompanyInviteRole,
    onSuccess: () => eventUtils.emit(REFETCH_INVITES_PAGE_EVENT_NAME)
  })
}
