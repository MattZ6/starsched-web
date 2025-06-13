import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function Loading() {
  return (
    <div className="flex flex-col border border-border rounded-md">
      <div className="flex items-center gap-6 p-4">
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="w-[20%] h-6" />
          <Skeleton className="w-[50%] h-6" />
        </div>

        <Skeleton className="w-[10%] h-9" />
      </div>

      <Separator />

      <div className="flex items-center gap-4 p-4">
        <Skeleton className="w-full h-2" />

        <Skeleton className="w-[100px] h-5" />
      </div>
    </div>
  )
}
