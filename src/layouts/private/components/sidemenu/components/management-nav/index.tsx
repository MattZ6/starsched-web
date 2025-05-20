import { ContactRound, Users } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const LINKS = [
  {
    Icon: ContactRound,
    title: 'Equipe',
    url: 'team'
  },
  {
    Icon: Users,
    title: 'Pacientes',
    url: 'admin/patients'
  },
]

export function ManagementNav() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Gerencia</SidebarGroupLabel>
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
