import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Pencil } from "lucide-react";
import type { CompanyMember } from "@starsched/sdk";

import { EventUtils } from "@/utils/event";

import { companyMembersEventNames } from "@/constants/company-members";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

const eventUtils = new EventUtils()

type Props = {
  companyId: string
  member: CompanyMember
}

export function UpdateRoleAction({ companyId, member }: Props) {
  const { t } = useTranslation('members', { keyPrefix: 'members.page.table.row.actions.update-role' })

  const handleOpen = useCallback(() => {
    eventUtils.emit(
      companyMembersEventNames.OPEN_UPDATE_ROLE_DIALOG,
      { companyId, memberId: member.id, currentRole: member.role }
    );
  }, [companyId, member.id, member.role])

  return (
    <DropdownMenuItem onClick={handleOpen}>
      <Pencil />
      {t('label')}
    </DropdownMenuItem>
  )
}
