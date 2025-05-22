import { useTranslation } from "react-i18next";
import { MoreHorizontal, Pencil, Send, Trash2 } from "lucide-react";

import { Tooltip } from "@/components/tooltip";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Actions() {
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
        <DropdownMenuItem disabled>
          <Send />
          {t('resend.label')}
        </DropdownMenuItem>

        <DropdownMenuItem disabled>
          <Pencil />
          {t('update-role.label')}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive" disabled>
          <Trash2 />
          {t('delete.label')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu >
  )
}
