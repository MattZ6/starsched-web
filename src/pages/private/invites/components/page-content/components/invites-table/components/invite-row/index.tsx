import type { CompanyInvite } from "@starsched/sdk";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";

import { StringUtils } from "@/utils/string";
import { DateUtils } from "@/utils/date";

import { useLanguage } from "@/hooks/use-language";
import { useSelectedCompany } from "@/hooks/use-selected-company";

import { Tooltip } from "@/components/tooltip";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TableCell, TableRow } from "@/components/ui/table";

import { Actions } from "./components/actions";

const stringUtils = new StringUtils()
const dateUtils = new DateUtils()

type Props = {
  invite: CompanyInvite
}

export function InviteRow({ invite }: Props) {
  const { t } = useTranslation('common', { keyPrefix: 'company' })
  const { language } = useLanguage()
  const selectedCompany = useSelectedCompany()

  const canEdit = selectedCompany?.role === 'owner' || selectedCompany?.role === 'manager'

  const invitedAt = dateUtils.formatDate(invite.created_at, { locale: language })
  const invitedAtDateTime = dateUtils.formatDateTime(invite.created_at, { locale: language })

  return (
    <TableRow >
      <TableCell className="px-4">
        <div className={cn("flex items-center gap-3", invite.is_expired ? 'opacity-30' : '')}>
          <Avatar className="size-10">
            <AvatarFallback>
              {stringUtils.getAvatarFallback(invite.email)}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="text-foreground font-normal">
              {invite.email}
            </span>
          </div>
        </div>
      </TableCell>
      <TableCell className="px-4">
        <div
          className={cn(
            "flex items-center gap-2 w-fit py-0.5 px-3 border border-border rounded-full",
            invite.is_expired ? 'opacity-30' : ''
          )}
        >
          <span className="text-sm">{t(`role.${invite.role}`)}</span>
        </div>
      </TableCell>
      <TableCell className="px-4">
        <span
          className={cn(
            "flex items-center w-fit gap-2 py-0.5 px-3 border border-border rounded-full text-sm",
            invite.is_expired ? 'opacity-30' : ''
          )}
        >
          {invite.is_expired ? t('invite.expired') : t(`invite.status.${'accepted'}`)}
        </span>
      </TableCell>
      <TableCell className="px-4">
        <Tooltip message={invitedAtDateTime}>
          <span className={cn(invite.is_expired ? 'opacity-30' : '')}>
            {invitedAt}
          </span>
        </Tooltip>
      </TableCell>
      <TableCell className="text-right px-4">
        {canEdit && (
          <Actions />
        )}
      </TableCell>
    </TableRow>
  )
}
