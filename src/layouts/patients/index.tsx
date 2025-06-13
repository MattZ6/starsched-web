import { SuspenseRouterOutlet } from "@/components/suspense-router-outlet";
import {
  PrivatePageBody,
  PrivatePageDescription,
  PrivatePageHeader,
  PrivatePageRoot,
  PrivatePageTitle,
} from "@/components/ui/private-page";

import { PlanProgress } from "./components/plan-progress";
import { TabsNav } from "./components/tabs-nav";

export function PatientsLayout() {
  // TODO: Adicionar traduções

  return (
    <PrivatePageRoot>
      <PrivatePageHeader>
        <PrivatePageTitle>Pacientes</PrivatePageTitle>
        <PrivatePageDescription>Visualize e gerencie os pacientes da sua clínica.</PrivatePageDescription>
      </PrivatePageHeader>

      <PlanProgress />

      <PrivatePageBody>
        <TabsNav />

        <SuspenseRouterOutlet />
      </PrivatePageBody>
    </PrivatePageRoot>
  )
}
