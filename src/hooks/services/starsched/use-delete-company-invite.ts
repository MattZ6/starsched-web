import { useMutation } from "@tanstack/react-query"

import { deleteCompanyInvite } from "@/services/starsched/delete-company-invite"

import { EventUtils } from "@/utils/event"

import { companyInvitesEventNames } from "@/constants/company-invites"

const eventUtils = new EventUtils()

export function useDeleteCompanyInvite() {

  return useMutation({
    mutationFn: deleteCompanyInvite,
    onSuccess: () => eventUtils.emit(companyInvitesEventNames.RESET_LIST)
  })
}
