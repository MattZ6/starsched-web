import type { CompanyMember } from "@starsched/sdk";
import { useTranslation } from "react-i18next";
import { Crown, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";

import { StringUtils } from "@/utils/string";
import { DateUtils } from "@/utils/date";

import { useLanguage } from "@/hooks/use-language";
import { useAuthentication } from "@/hooks/use-authentication";
import { useSelectedCompany } from "@/hooks/use-selected-company";

import { Tooltip } from "@/components/tooltip";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TableCell, TableRow } from "@/components/ui/table";

const stringUtils = new StringUtils()
const dateUtils = new DateUtils()

type Props = {
  actionsDisabled: boolean
  member: CompanyMember
}

export function MemberRow({ member, actionsDisabled }: Props) {
  const { t } = useTranslation('common', { keyPrefix: 'company' })
  const { language } = useLanguage()
  const { user } = useAuthentication()
  const selectedCompany = useSelectedCompany()

  const isMe = user?.id === member.user.id
  const canEdit = !isMe && member.role !== 'owner' && (selectedCompany?.role === 'owner' || selectedCompany?.role === 'manager')

  const memberSince = dateUtils.formatDate(member.created_at, { locale: language })
  const memberSinceDateTime = dateUtils.formatDateTime(member.created_at, { locale: language })

  return (
    <TableRow >
      <TableCell className="px-4">
        <div className={cn("flex items-center gap-3", member.access === "disabled" ? 'opacity-30' : '')}>
          <Avatar className="size-10">
            <AvatarFallback>
              {stringUtils.getAvatarFallback(member.user.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="text-foreground font-medium">
              {member.user.name} {isMe && (
                <span className="text-muted-foreground font-normal">(você)</span>
              )}
            </span>
            <span className="text-sm text-muted-foreground font-normal">
              {member.user.email}
            </span>
          </div>
        </div>
      </TableCell>
      <TableCell className="px-4">
        <div
          className={cn(
            "flex items-center gap-2 w-fit py-0.5 px-3 border border-border rounded-full",
            member.access === "disabled" ? 'opacity-30' : ''
          )}
        >
          {member.role === 'owner' && <Crown className="size-3.5" />}
          <span className="text-sm">{t(`role.${member.role}`)}</span>
        </div>
      </TableCell>
      <TableCell className="px-4">
        <span
          className={cn(
            "flex items-center w-fit gap-2 py-0.5 px-3 border border-border rounded-full text-sm",
            member.access === "disabled" ? 'opacity-30' : ''
          )}
        >
          {t(`access.${member.access}`)}
        </span>
      </TableCell>
      <TableCell className="px-4">
        <Tooltip message={memberSinceDateTime}>
          <span className={cn(member.access === "disabled" ? 'opacity-30' : '')}>
            {memberSince}
          </span>
        </Tooltip>
      </TableCell>
      <TableCell className="text-right px-4">
        {canEdit && (
          <Button variant="ghost" size="icon" disabled={actionsDisabled}>
            <MoreHorizontal />
          </Button>
        )}
      </TableCell>
    </TableRow>
  )
}
