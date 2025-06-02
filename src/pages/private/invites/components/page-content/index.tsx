import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useGetCompanyInvitations } from "@/hooks/services/starsched/use-get-company-invitations";
import { useSelectedCompany } from "@/hooks/use-selected-company";

import { EventUtils } from "@/utils/event";

import { companyInvitesEventNames } from "@/constants/company-invites";

import { Loading } from "./components/loading";
import { Failure } from "./components/failure";
import { InvitesTable } from "./components/invites-table";

const ITEMS_PER_PAGE = 5

const eventUtils = new EventUtils()

export function PageContent() {
  const queryClient = useQueryClient()
  const selectedCompany = useSelectedCompany()
  const [page, setPage] = useState(1)
  const { isLoading, isFetching, error, refetch, data } = useGetCompanyInvitations({
    companyId: selectedCompany!.id,
    sortBy: 'created_at',
    orderBy: 'desc',
    itemsPerPage: ITEMS_PER_PAGE,
    page
  })

  const handleGoToFirstPage = useCallback(() => {
    setPage(1)
  }, [])

  const handleGoToPreviousPage = useCallback(() => {
    setPage(currentPage => currentPage <= 1 ? 1 : currentPage - 1)
  }, [])

  const handleGoToNextPage = useCallback(() => {
    if (data) {
      const totalPages = Math.ceil(data.total_items_count / ITEMS_PER_PAGE)

      setPage(currentPage => currentPage >= totalPages ? totalPages : currentPage + 1)
    }
  }, [data])

  const handleGoToLastPage = useCallback(() => {
    if (data) {
      setPage(Math.ceil(data.total_items_count / ITEMS_PER_PAGE))
    }
  }, [data])

  useEffect(() => {
    eventUtils.subscribe(companyInvitesEventNames.RESET_LIST, () => {
      setPage(1)

      queryClient.resetQueries({
        queryKey: ['company-invitations', selectedCompany?.id]
      })
    })

    return () => eventUtils.unsubscribe(companyInvitesEventNames.RESET_LIST, () => { })
  }, [queryClient, selectedCompany?.id])

  useEffect(() => {
    eventUtils.subscribe(companyInvitesEventNames.RESET_PAGE, () => refetch())

    return () => eventUtils.unsubscribe(companyInvitesEventNames.RESET_PAGE, () => { })
  }, [refetch])

  if (isLoading) {
    return <Loading itemsPerPage={ITEMS_PER_PAGE} />
  }

  if (error) {
    return <Failure error={error} onTryAgain={refetch} />
  }

  const invitations = data?.items ?? [];
  const totalItems = data?.total_items_count ?? 0;

  return <InvitesTable
    isFetching={isFetching}
    itemsPerPage={ITEMS_PER_PAGE}
    invites={invitations}
    page={page}
    totalItems={totalItems}
    onFirstPage={handleGoToFirstPage}
    onPreviousPage={handleGoToPreviousPage}
    onNextPage={handleGoToNextPage}
    onLastPage={handleGoToLastPage}
  />
}
