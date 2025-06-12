import { useMutation } from "@tanstack/react-query"

import { createCompanyInvite } from "@/services/starsched/create-company-invite"

import { companyInvitesEventNames } from "@/constants/company-invites"
import { companyPlanEventNames } from "@/constants/company-plan"

import { EventUtils } from "@/utils/event"

const eventUtils = new EventUtils()

export function useCreateCompanyInvite() {
  return useMutation({
    mutationFn: createCompanyInvite,
    onSuccess: () => {
      eventUtils.emit(companyInvitesEventNames.RESET_LIST)
      eventUtils.emit(companyPlanEventNames.MEMBERS_COUNT_UPDATED)
    }
  })
}
