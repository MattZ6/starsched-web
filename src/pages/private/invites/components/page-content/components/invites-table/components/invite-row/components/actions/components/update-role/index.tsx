import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Pencil } from "lucide-react";
import type { CompanyInvite } from "@starsched/sdk";

import { EventUtils } from "@/utils/event";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

const eventUtils = new EventUtils()
const UPDATE_INVITE_ROLE_EVENT_NAME = 'update-invite-role'

type Props = {
  companyId: string
  invite: CompanyInvite
}

export function UpdateRoleAction({ companyId, invite }: Props) {
  const { t } = useTranslation('invites', { keyPrefix: 'invites.page.table.row.actions.update-role' })

  const handleOpen = useCallback(() => {
    eventUtils.emit(UPDATE_INVITE_ROLE_EVENT_NAME, { companyId, inviteId: invite.id, currentRole: invite.role });
  }, [companyId, invite.id, invite.role])

  return (
    <DropdownMenuItem onClick={handleOpen}>
      <Pencil />
      {t('label')}
    </DropdownMenuItem>
  )
}
