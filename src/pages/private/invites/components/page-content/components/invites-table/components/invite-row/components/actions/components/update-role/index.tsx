import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Pencil } from "lucide-react";
import type { CompanyInvite } from "@starsched/sdk";

import { EventUtils } from "@/utils/event";

import { companyInvitesEventNames } from "@/constants/company-invites";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

const eventUtils = new EventUtils()

type Props = {
  companyId: string
  invite: CompanyInvite
}

export function UpdateRoleAction({ companyId, invite }: Props) {
  const { t } = useTranslation('invites', { keyPrefix: 'invites.page.table.row.actions.update-role' })

  const handleOpen = useCallback(() => {
    eventUtils.emit(
      companyInvitesEventNames.OPEN_UPDATE_ROLE_DIALOG,
      { companyId, inviteId: invite.id, currentRole: invite.role }
    );
  }, [companyId, invite.id, invite.role])

  return (
    <DropdownMenuItem onClick={handleOpen}>
      <Pencil />
      {t('label')}
    </DropdownMenuItem>
  )
}
