import { useTranslation } from "react-i18next"
import { Plus } from "lucide-react"

import { useGetMyCompanies } from "@/hooks/services/starsched/use-get-my-companies"
import { useIsMobile } from "@/hooks/use-mobile"

import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { CurrentCompany } from "./components/current-company"
import { CompanyButton } from "./components/company-button"

export function CompanySwitcher() {
  const { t } = useTranslation('company-layout', { keyPrefix: 'sidemenu.company-switcher' })
  const isMobile = useIsMobile()
  const { data: companies } = useGetMyCompanies()

  if (!companies) {
    return (
      <div className="flex items-center gap-2 rounded-md p-2">
        <Skeleton className="flex aspect-square size-8 rounded-md" />

        <div className="flex-1 flex flex-col gap-2 text-left">
          <Skeleton className="w-[100%] h-3" />
          <Skeleton className="w-[80%] h-3" />
        </div>
      </div>
    )
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <CurrentCompany />

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              {t('label')}
            </DropdownMenuLabel>

            {companies.map((company) => (
              <CompanyButton key={company.id} company={company} />
            ))}

            <DropdownMenuSeparator />

            <DropdownMenuItem className="gap-2 p-2" disabled>
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <span className="font-medium text-muted-foreground">
                {t('add-company-button.label')}
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu >
  )
}
