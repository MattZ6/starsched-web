import { HomeIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const LINKS = [
  {
    Icon: HomeIcon,
    title: 'Início',
    url: ''
  },
]

export function DefaultNav() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
      <SidebarMenu>
        {LINKS.map((link) => (
          <SidebarMenuItem key={link.title}>
            <SidebarMenuButton disabled>
              <link.Icon />
              <span>{link.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
