import { useTranslation } from "react-i18next";
import type { CompanyInvite } from "@starsched/sdk";

import { TablePagination } from "@/components/table-pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { SkeletonRow } from "../skeleton-row";

import { InviteRow } from "./components/invite-row";
import { Button } from "@/components/ui/button";
import { UpdateRoleDialog } from "./components/update-role-dialog";

type Props = {
  isFetching: boolean
  itemsPerPage: number
  page: number
  totalItems: number
  invites: CompanyInvite[]
  onFirstPage: () => void
  onPreviousPage: () => void
  onNextPage: () => void
  onLastPage: () => void
}

export function InvitesTable({ invites, isFetching, itemsPerPage, page, totalItems, onFirstPage, onPreviousPage, onNextPage, onLastPage }: Props) {
  const { t } = useTranslation('invites', { keyPrefix: 'invites.page' })
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <>
      <section className="flex flex-col gap-4">
        <header className="flex items-center justify-end gap-4">
          <div className="flex items-center gap-2">
            <Button type="button" disabled>
              {t('header.actions.invite.label')}
            </Button>
          </div>
        </header>

        <div className="flex flex-col border border-border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-4">{t('table.header.email')}</TableHead>
                <TableHead className="px-4 w-[15%]">{t('table.header.role')}</TableHead>
                <TableHead className="px-4 w-[15%]">{t('table.header.status')}</TableHead>
                <TableHead className="px-4 w-[15%]">{t('table.header.invited-at')}</TableHead>
                <TableHead className="w-[68px] text-right px-4"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isFetching && <>
                {Array.from({ length: itemsPerPage }).map((_, index) => <SkeletonRow key={index} index={index} />)}
              </>}

              {!isFetching && !!invites.length && <>
                {invites.map(invite => <InviteRow key={invite.id} invite={invite} />)}
              </>}

              {!isFetching && !invites.length && <>
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
            {t('table.footer.invites-count', { count: totalItems })}
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

      <UpdateRoleDialog />
    </>
  )
}
