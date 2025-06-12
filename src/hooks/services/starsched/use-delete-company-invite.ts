import { useMutation } from "@tanstack/react-query"

import { deleteCompanyInvite } from "@/services/starsched/delete-company-invite"

import { companyInvitesEventNames } from "@/constants/company-invites"
import { companyPlanEventNames } from "@/constants/company-plan"

import { EventUtils } from "@/utils/event"

const eventUtils = new EventUtils()

export function useDeleteCompanyInvite() {
  return useMutation({
    mutationFn: deleteCompanyInvite,
    onSuccess: () => {
      eventUtils.emit(companyInvitesEventNames.RESET_LIST)
      eventUtils.emit(companyPlanEventNames.MEMBERS_COUNT_UPDATED)
    }
  })
}
