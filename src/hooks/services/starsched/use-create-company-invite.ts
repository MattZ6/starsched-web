import { useMutation } from "@tanstack/react-query"

import { createCompanyInvite } from "@/services/starsched/create-company-invite"

import { EventUtils } from "@/utils/event"

import { companyInvitesEventNames } from "@/constants/company-invites"

const eventUtils = new EventUtils()

export function useCreateCompanyInvite() {
  return useMutation({
    mutationFn: createCompanyInvite,
    onSuccess: () => eventUtils.emit(companyInvitesEventNames.RESET_LIST)
  })
}
