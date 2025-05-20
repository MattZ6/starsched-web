import { Link } from "react-router-dom"
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
            <SidebarMenuButton asChild>
              <Link to={`/${link.url}`}>
                <link.Icon />
                <span>{link.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
