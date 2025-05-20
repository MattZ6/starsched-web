import { SuspenseRouterOutlet } from "@/components/suspense-router-outlet";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Sidemenu } from "./components/sidemenu";

export function PrivateLayout() {
  return (
    <SidebarProvider>
      <Sidemenu />

      <SidebarInset>
        <SuspenseRouterOutlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
