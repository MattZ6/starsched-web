import { useCallback, useEffect, useState } from "react";

import { useGetCompanyInvitations } from "@/hooks/services/starsched/use-get-company-invitations";
import { useSelectedCompany } from "@/hooks/use-selected-company";

import { EventUtils } from "@/utils/event";

import { Loading } from "./components/loading";
import { Failure } from "./components/failure";
import { InvitesTable } from "./components/invites-table";

const ITEMS_PER_PAGE = 5

const eventUtils = new EventUtils()
const REFETCH_INVITES_PAGE_EVENT_NAME = 'refetch-company-invitations-page'

export function PageContent() {
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
    eventUtils.subscribe(REFETCH_INVITES_PAGE_EVENT_NAME, () => refetch())

    return () => eventUtils.unsubscribe(REFETCH_INVITES_PAGE_EVENT_NAME, () => { })

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
