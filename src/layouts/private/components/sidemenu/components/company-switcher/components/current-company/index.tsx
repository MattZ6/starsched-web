import { useTranslation } from "react-i18next";
import { Building, ChevronsUpDown } from "lucide-react";

import { StringUtils } from "@/utils/string";

import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { useSelectedCompany } from "@/hooks/use-selected-company";

const stringUtils = new StringUtils()

export function CurrentCompany() {
  const { t } = useTranslation('common', { keyPrefix: 'company' })
  const selectedCompany = useSelectedCompany()

  const avatarFallback = stringUtils.getAvatarFallback(selectedCompany?.name)

  return (
    <DropdownMenuTrigger asChild>
      <SidebarMenuButton
        size="lg"
        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      >
        <div className="flex aspect-square size-8 items-center justify-center border rounded-md bg-background">
          {avatarFallback ? (
            <span className="shrink-0">{avatarFallback}</span>
          ) : (
            <Building className="size-5" />
          )}
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          {selectedCompany ? (
            <>
              <span className="truncate font-semibold">
                {selectedCompany?.name}
              </span>
              <span className="truncate text-xs">
                {t(`role.${selectedCompany?.role}`)}
              </span>
            </>
          ) : (
            <span className="truncate">
              {t('select.empty.label')}
            </span>
          )}
        </div>
        <ChevronsUpDown className="ml-auto" />
      </SidebarMenuButton>
    </DropdownMenuTrigger>
  )
}
