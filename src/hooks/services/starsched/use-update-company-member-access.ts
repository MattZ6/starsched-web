import { useMutation } from "@tanstack/react-query"

import { updateCompanyMemberAccess } from "@/services/starsched/update-company-member-access"

import { EventUtils } from "@/utils/event"

import { companyMembersEventNames } from "@/constants/company-members"

const eventUtils = new EventUtils()

export function useUpdateCompanyMemberAccess() {
  return useMutation({
    mutationFn: updateCompanyMemberAccess,
    onSuccess: () => eventUtils.emit(companyMembersEventNames.RESET_PAGE)
  })
}
