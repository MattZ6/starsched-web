import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Trash2 } from "lucide-react";

import { companyInvitesEventNames } from "@/constants/company-invites";

import { EventUtils } from "@/utils/event";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

const eventUtils = new EventUtils()

type Props = {
  companyId: string
  inviteId: string
}

export function DeleteAction({ companyId, inviteId }: Props) {
  const { t } = useTranslation('invites', { keyPrefix: 'invites.page.table.row.actions.delete' })

  const handleOpen = useCallback(() => {
    eventUtils.emit(companyInvitesEventNames.OPEN_DELETE_DIALOG, { companyId, inviteId });
  }, [companyId, inviteId])

  return (
    <DropdownMenuItem onClick={handleOpen} variant="destructive">
      <Trash2 />
      {t('label')}
    </DropdownMenuItem>
  )
}
