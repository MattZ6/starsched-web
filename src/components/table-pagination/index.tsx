import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/tooltip";

type Props = {
  isLoading: boolean
  page: number
  totalPages: number
  onFirstPage: () => void
  onPreviousPage: () => void
  onNextPage: () => void
  onLastPage: () => void
}

export function TablePagination({ page, totalPages, isLoading, onFirstPage, onPreviousPage, onNextPage, onLastPage }: Props) {
  const { t } = useTranslation('common', { keyPrefix: 'pagination' })

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-muted-foreground ml-auto">
        {t('pages', { page, totalPages })}
      </span>

      <div className="flex items-center gap-2">
        <Tooltip message={t('first-page.tooltip')}>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="border border-border"
            aria-label={t('first-page.label')}
            disabled={page <= 1 || isLoading}
            onClick={onFirstPage}
          >
            <ChevronsLeft aria-hidden />
          </Button>
        </Tooltip>
        <Tooltip message={t('previous-page.tooltip')}>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="border border-border"
            aria-label={t('previous-page.label')}
            disabled={page <= 1 || isLoading}
            onClick={onPreviousPage}
          >
            <ChevronLeft />
          </Button>
        </Tooltip>
        <Tooltip message={t('next-page.tooltip')}>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="border border-border"
            aria-label={t('next-page.label')}
            disabled={page >= totalPages || isLoading}
            onClick={onNextPage}
          >
            <ChevronRight />
          </Button>
        </Tooltip>
        <Tooltip message={t('last-page.tooltip')}>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="border border-border"
            aria-label={t('last-page.label')}
            disabled={page >= totalPages || isLoading}
            onClick={onLastPage}
          >
            <ChevronsRight />
          </Button>
        </Tooltip>
      </div>
    </div>
  )
}
