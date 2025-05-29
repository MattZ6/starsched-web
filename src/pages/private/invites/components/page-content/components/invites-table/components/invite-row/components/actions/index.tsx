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
        <ResendAction companyId={companyId} inviteId={invite.id} />

        <UpdateRoleAction companyId={companyId} invite={invite} />

        <DropdownMenuSeparator />

        <DeleteAction companyId={companyId} inviteId={invite.id} />
      </DropdownMenuContent>
    </DropdownMenu >
  )
}
