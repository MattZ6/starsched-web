import { useMutation } from "@tanstack/react-query"

import { updateCompanyMemberRole } from "@/services/starsched/update-company-member-role"

import { EventUtils } from "@/utils/event"

import { companyMembersEventNames } from "@/constants/company-members"

const eventUtils = new EventUtils()

export function useUpdateCompanyMemberRole() {
  return useMutation({
    mutationFn: updateCompanyMemberRole,
    onSuccess: () => eventUtils.emit(companyMembersEventNames.RESET_PAGE)
  })
}
