import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { SkeletonRow } from "../skeleton-row";

type Props = {
  itemsPerPage: number
}

export function Loading({ itemsPerPage }: Props) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col border border-border rounded-md">
        <Table>
          <TableHeader>
            <TableRow hoverDisabled>
              <TableHead className="px-4">
                <Skeleton className="w-[120px] h-5" />
              </TableHead>
              <TableHead className="px-4 w-[15%]">
                <Skeleton className="w-[80px] h-5" />
              </TableHead>
              <TableHead className="px-4 w-[15%]">
                <Skeleton className="w-[80px] h-5" />
              </TableHead>
              <TableHead className="px-4 w-[15%]">
                <Skeleton className="w-[110px] h-5" />
              </TableHead>
              <TableHead className="w-[68px] text-right px-4"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              Array
                .from({ length: itemsPerPage })
                .map((_, index) => <SkeletonRow key={index} index={index} />)
            }
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center gap-4">
        <Skeleton className="w-[60px] h-4" />

        <Skeleton className="w-[100px] h-5 ml-auto" />

        <div className="flex items-center gap-2">
          <Skeleton className="size-9" />
          <Skeleton className="size-9" />
          <Skeleton className="size-9" />
          <Skeleton className="size-9" />
        </div>
      </div>
    </section>
  )
}
