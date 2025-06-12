import { useMutation } from "@tanstack/react-query"

import { updateCompanyMemberAccess } from "@/services/starsched/update-company-member-access"

import { companyMembersEventNames } from "@/constants/company-members"
import { companyPlanEventNames } from "@/constants/company-plan"

import { EventUtils } from "@/utils/event"

const eventUtils = new EventUtils()

export function useUpdateCompanyMemberAccess() {
  return useMutation({
    mutationFn: updateCompanyMemberAccess,
    onSuccess: () => {
      eventUtils.emit(companyMembersEventNames.RESET_PAGE)
      eventUtils.emit(companyPlanEventNames.MEMBERS_COUNT_UPDATED)
    }
  })
}
