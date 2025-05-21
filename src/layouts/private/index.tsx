import { Outlet } from "react-router-dom";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Sidemenu } from "./components/sidemenu";

export function PrivateLayout() {
  return (
    <SidebarProvider>
      <Sidemenu />

      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
