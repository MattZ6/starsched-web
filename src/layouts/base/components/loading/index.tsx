import { BasicPageBody, BasicPageHeader, BasicPageRoot, BasicPageWrapper } from "@/components/ui/basic-page";
import { Skeleton } from "@/components/ui/skeleton";

export function Loading() {
  return (
    <BasicPageWrapper>
      <BasicPageRoot>
        <Skeleton className="size-12 rounded-md" />

        <BasicPageHeader className="w-full items-center">
          <Skeleton className="w-[60%] h-9" />
          <Skeleton className="w-[100%] h-6" />
          <Skeleton className="w-[95%] h-6" />
        </BasicPageHeader>

        <BasicPageBody>
          <Skeleton className="w-[100%] h-8" />
        </BasicPageBody>
      </BasicPageRoot>
    </BasicPageWrapper>
  )
}
