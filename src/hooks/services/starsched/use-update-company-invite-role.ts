import { useMutation } from "@tanstack/react-query"

import { updateCompanyInviteRole } from "@/services/starsched/update-company-invite-role"

import { EventUtils } from "@/utils/event"

import { companyInvitesEventNames } from "@/constants/company-invites"

const eventUtils = new EventUtils()

export function useUpdateCompanyInviteRole() {
  return useMutation({
    mutationFn: updateCompanyInviteRole,
    onSuccess: () => eventUtils.emit(companyInvitesEventNames.RESET_PAGE)
  })
}
