import { NavLink, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { ContactRound, Users } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

type Params = {
  companySlug: string
}

export function ManagementNav() {
  const { t } = useTranslation('company-layout', { keyPrefix: 'sidemenu.management-nav' })
  const { companySlug } = useParams<Params>()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t('label')}</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <NavLink
              to={`/${companySlug}/team`}
              className="text-muted-foreground aria-[current='page']:text-foreground"
            >
              <ContactRound />
              <span>{t('team.link.label')}</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <NavLink
              to={`/${companySlug}/patients`}
              className="text-muted-foreground aria-[current='page']:text-foreground"
            >
              <Users />
              <span>{t('patients.link.label')}</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
