import { Settings } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const LINKS = [
  {
    Icon: Settings,
    title: 'Configurações',
    url: '/settings'
  }
]

export function BottomNav() {
  return (
    <SidebarGroup className="mt-auto">
      <SidebarGroupContent>
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
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
