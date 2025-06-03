import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Ban, UserRoundCheck } from "lucide-react";
import type { CompanyMember } from "@starsched/sdk";

import { EventUtils } from "@/utils/event";

import { companyMembersEventNames } from "@/constants/company-members";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

const eventUtils = new EventUtils()

type Props = {
  companyId: string
  companyName: string
  member: CompanyMember
}

export function UpdateAccessAction({ companyId, companyName, member }: Props) {
  const { t } = useTranslation('members', { keyPrefix: 'members.page.table.row.actions.update-access' })

  const accessEnabled = member.access === 'enabled'

  const handleOpen = useCallback(() => {
    eventUtils.emit(
      companyMembersEventNames.OPEN_UPDATE_ACCESS_DIALOG,
      { companyId, companyName, memberId: member.id, currentAccess: member.access, memberName: member.user.name }
    );
  }, [companyId, companyName, member.id, member.access, member.user.name])

  return (
    <DropdownMenuItem onClick={handleOpen} variant={accessEnabled ? "destructive" : "default"}>
      {accessEnabled ? <Ban /> : < UserRoundCheck />}
      {t(`label.${accessEnabled ? 'inactivate' : 'activate'}`)}
    </DropdownMenuItem>
  )
}
