import { Plus } from "lucide-react"

import { useGetMyCompanies } from "@/hooks/services/starsched/use-get-my-companies"
import { useIsMobile } from "@/hooks/use-mobile"

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
  const isMobile = useIsMobile()
  const { isLoading, error, data } = useGetMyCompanies()

  if (isLoading) {
    return <span>carregando...</span>;
  }

  if (error) {
    return <span>falha</span>
  }

  const companies = data!

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
              {/* {t('company-membership.select.label')} */}
              Clínica
            </DropdownMenuLabel>

            {companies.map((company) => (
              <CompanyButton key={company.id} company={company} />
            ))}

            <DropdownMenuSeparator />

            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <span className="font-medium text-muted-foreground">
                Nova clínica
                {/* {t('company-membership.new-company.button.label')} */}
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu >
  )
}
