import { useTranslation } from "react-i18next";
import { MoreHorizontal } from "lucide-react";
import type { CompanyInvite } from "@starsched/sdk";

import { Tooltip } from "@/components/tooltip";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { UpdateRoleAction } from "./components/update-role";
import { DeleteAction } from "./components/delete";
import { ResendAction } from "./components/resend";

type Props = {
  companyId: string
  invite: CompanyInvite
}

export function Actions({ companyId, invite }: Props) {
  const { t } = useTranslation('invites', { keyPrefix: 'invites.page.table.row.actions' })

  const canResend = invite.status === 'pending' && invite.is_expired
  const canUpdateRole = invite.status === 'pending' && !invite.is_expired
  const canDelete = invite.status === 'pending' || invite.status === 'rejected'

  const showMenuSeparator = (canResend || canUpdateRole) && canDelete

  return (
    <DropdownMenu>
      <Tooltip message={t('label')}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="not-disabled:cursor-pointer">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
      </Tooltip>

      <DropdownMenuContent align="end">
        {canResend && (
          <ResendAction companyId={companyId} inviteId={invite.id} />
        )}

        {canUpdateRole && (
          <UpdateRoleAction companyId={companyId} invite={invite} />
        )}

        {showMenuSeparator && (
          <DropdownMenuSeparator />
        )}

        {canDelete && (
          <DeleteAction companyId={companyId} inviteId={invite.id} />
        )}
      </DropdownMenuContent>
    </DropdownMenu >
  )
}
