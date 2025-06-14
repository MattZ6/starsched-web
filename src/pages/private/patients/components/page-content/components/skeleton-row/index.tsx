import { cn } from "@/lib/utils";

import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

type Props = {
  index: number
}

export function SkeletonRow({ index }: Props) {
  return (
    <TableRow hoverDisabled>
      <TableCell className="px-4">
        <div className={cn("flex items-center gap-3")}>
          <Skeleton className="size-10 rounded-full" />

          <div className="flex flex-col gap-1">
            <Skeleton className={cn("h-5", index % 2 ? 'w-[120px]' : 'w-[140px]')} />
          </div>
        </div>
      </TableCell>
      <TableCell className="px-4">
        <Skeleton className="w-[85px] h-5" />
      </TableCell>
      <TableCell className="px-4">
        <Skeleton className="w-[85px] h-5" />
      </TableCell>
      <TableCell className="text-right px-4">
      </TableCell>
    </TableRow>
  )
}
