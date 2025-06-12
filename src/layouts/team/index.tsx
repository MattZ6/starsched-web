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

export function TeamLayout() {
  // TODO: Adicionar traduções

  return (
    <PrivatePageRoot>
      <PrivatePageHeader>
        <PrivatePageTitle>Equipe</PrivatePageTitle>
        <PrivatePageDescription>Gerenciar convites e equipes</PrivatePageDescription>
      </PrivatePageHeader>

      <PlanProgress />

      <PrivatePageBody>
        <TabsNav />

        <SuspenseRouterOutlet />
      </PrivatePageBody>
    </PrivatePageRoot>
  )
}
