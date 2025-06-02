import { useTranslation } from "react-i18next";
import { MoreHorizontal } from "lucide-react";
import type { CompanyMember } from "@starsched/sdk";

import { Tooltip } from "@/components/tooltip";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { UpdateRoleAction } from "./components/update-role";

type Props = {
  companyId: string
  member: CompanyMember
}

export function Actions({ companyId, member }: Props) {
  const { t } = useTranslation('members', { keyPrefix: 'members.page.table.row.actions' })

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
        <UpdateRoleAction companyId={companyId} member={member} />
      </DropdownMenuContent>
    </DropdownMenu >
  )
}
