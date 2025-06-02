import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useGetCompanyMembers } from "@/hooks/services/starsched/use-get-company-members";
import { useSelectedCompany } from "@/hooks/use-selected-company";

import { EventUtils } from "@/utils/event";

import { Loading } from "./components/loading";
import { Failure } from "./components/failure";
import { MembersTable } from "./components/members-table";
import { companyMembersEventNames } from "@/constants/company-members";

const ITEMS_PER_PAGE = 5

const eventUtils = new EventUtils()

export function PageContent() {
  const queryClient = useQueryClient()
  const selectedCompany = useSelectedCompany()
  const [page, setPage] = useState(1)
  const { isLoading, isFetching, error, refetch, data } = useGetCompanyMembers({
    companyId: selectedCompany!.id,
    sortBy: 'name',
    orderBy: 'asc',
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
    eventUtils.subscribe(companyMembersEventNames.RESET_LIST, () => {
      setPage(1)

      queryClient.resetQueries({
        queryKey: ['company-members', selectedCompany?.id]
      })
    })

    return () => eventUtils.unsubscribe(companyMembersEventNames.RESET_LIST, () => { })
  }, [queryClient, selectedCompany?.id])

  useEffect(() => {
    eventUtils.subscribe(companyMembersEventNames.RESET_PAGE, () => refetch())

    return () => eventUtils.unsubscribe(companyMembersEventNames.RESET_PAGE, () => { })
  }, [refetch])

  if (isLoading) {
    return <Loading itemsPerPage={ITEMS_PER_PAGE} />
  }

  if (error) {
    return <Failure error={error} onTryAgain={refetch} />
  }

  const members = data?.items ?? [];
  const totalItems = data?.total_items_count ?? 0;

  return <MembersTable
    isFetching={isFetching}
    itemsPerPage={ITEMS_PER_PAGE}
    members={members}
    page={page}
    totalItems={totalItems}
    onFirstPage={handleGoToFirstPage}
    onPreviousPage={handleGoToPreviousPage}
    onNextPage={handleGoToNextPage}
    onLastPage={handleGoToLastPage}
  />
}
