import { useTranslation } from "react-i18next";
import type { CompanyMember } from "@starsched/sdk";

import { TablePagination } from "@/components/table-pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { SkeletonRow } from "../skeleton-row";

import { MemberRow } from "./components/member-row";

type Props = {
  isFetching: boolean
  itemsPerPage: number
  page: number
  totalItems: number
  members: CompanyMember[]
  onFirstPage: () => void
  onPreviousPage: () => void
  onNextPage: () => void
  onLastPage: () => void
}

export function MembersTable({ members, isFetching, itemsPerPage, page, totalItems, onFirstPage, onPreviousPage, onNextPage, onLastPage }: Props) {
  const { t } = useTranslation('members', { keyPrefix: 'members.page' })
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col border border-border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-4">{t('table.header.member')}</TableHead>
              <TableHead className="px-4 w-[15%]">{t('table.header.role')}</TableHead>
              <TableHead className="px-4 w-[15%]">{t('table.header.access')}</TableHead>
              <TableHead className="px-4 w-[15%]">{t('table.header.member-since')}</TableHead>
              <TableHead className="w-[68px] text-right px-4"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isFetching && <>
              {Array.from({ length: itemsPerPage }).map((_, index) => <SkeletonRow key={index} index={index} />)}
            </>}

            {!isFetching && !!members.length && <>
              {members.map(member => <MemberRow key={member.id} member={member} actionsDisabled={isFetching} />)}
            </>}

            {!isFetching && !members.length && <>
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-4">
                  {t('table.empty.message')}
                </TableCell>
              </TableRow>
            </>}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-xs text-muted-foreground self-start">
          {t('table.footer.members-count', { count: totalItems })}
        </span>

        <div className="ml-auto">
          <TablePagination
            isLoading={isFetching}
            page={page}
            totalPages={totalPages}
            onFirstPage={onFirstPage}
            onPreviousPage={onPreviousPage}
            onNextPage={onNextPage}
            onLastPage={onLastPage}
          />
        </div>
      </div>
    </section>
  )
}
