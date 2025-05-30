import { useMutation } from "@tanstack/react-query"

import { resendCompanyInvite } from "@/services/starsched/resend-company-invite"

import { EventUtils } from "@/utils/event"

import { companyInvitesEventNames } from "@/constants/company-invites"

const eventUtils = new EventUtils()

export function useResendCompanyInvite() {
  return useMutation({
    mutationFn: resendCompanyInvite,
    onSuccess: () => eventUtils.emit(companyInvitesEventNames.RESET_PAGE)
  })
}
