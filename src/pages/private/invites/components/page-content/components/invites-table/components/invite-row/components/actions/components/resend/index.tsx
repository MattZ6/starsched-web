import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Send } from "lucide-react";

import { EventUtils } from "@/utils/event";

import { companyInvitesEventNames } from "@/constants/company-invites";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

const eventUtils = new EventUtils()

type Props = {
  companyId: string
  inviteId: string
}

export function ResendAction({ companyId, inviteId }: Props) {
  const { t } = useTranslation('invites', { keyPrefix: 'invites.page.table.row.actions.resend' })

  const handleOpen = useCallback(() => {
    eventUtils.emit(companyInvitesEventNames.OPEN_RESEND_DIALOG, { companyId, inviteId });
  }, [companyId, inviteId])

  return (
    <DropdownMenuItem onSelect={handleOpen}>
      <Send />
      {t('label')}
    </DropdownMenuItem>
  )
}
