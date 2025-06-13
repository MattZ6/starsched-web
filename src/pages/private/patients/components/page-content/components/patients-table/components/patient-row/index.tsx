import type { CompanyPatient } from "@starsched/sdk";

import { cn } from "@/lib/utils";

import { StringUtils } from "@/utils/string";
import { DateUtils } from "@/utils/date";

import { useLanguage } from "@/hooks/use-language";

import { Tooltip } from "@/components/tooltip";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TableCell, TableRow } from "@/components/ui/table";

const stringUtils = new StringUtils()
const dateUtils = new DateUtils()

type Props = {
  patient: CompanyPatient
}

export function PatientRow({ patient }: Props) {
  const { language } = useLanguage()

  const createdAt = dateUtils.formatDate(patient.created_at, { locale: language })
  const createdAtDateTime = dateUtils.formatDateTime(patient.created_at, { locale: language })

  return (
    <TableRow >
      <TableCell className="px-4">
        <div className={cn("flex items-center gap-3")}>
          <Avatar className="size-10">
            <AvatarFallback>
              {stringUtils.getAvatarFallback(patient.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="text-foreground font-medium">
              {patient.name}
            </span>
            {/* <span className="text-sm text-muted-foreground font-normal">
              {patient.user.email}
            </span> */}
          </div>
        </div>
      </TableCell>
      <TableCell className="px-4">
        <div className="flex flex-col">
          <span className="text-foreground">
            13/06/2020
          </span>
          <span className="text-sm text-muted-foreground font-normal">
            5 anos
          </span>
        </div>
      </TableCell>
      <TableCell className="px-4">
        <Tooltip message={createdAtDateTime}>
          <span>
            {createdAt}
          </span>
        </Tooltip>
      </TableCell>
      <TableCell className="text-right px-4">
        {/* TODO: actions */}
      </TableCell>
    </TableRow>
  )
}
