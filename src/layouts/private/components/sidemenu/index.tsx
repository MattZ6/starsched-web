
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

import { CompanySwitcher } from "./components/company-switcher"
import { DefaultNav } from "./components/default-nav"
import { ManagementNav } from "./components/management-nav"
import { BottomNav } from "./components/bottom-nav"
import { ProfileLink } from "./components/profile-link"

export function Sidemenu() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <CompanySwitcher />
      </SidebarHeader>

      <SidebarContent>
        <DefaultNav />
        <ManagementNav />
        <BottomNav />
      </SidebarContent>

      <SidebarFooter>
        <ProfileLink />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
