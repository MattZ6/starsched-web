import { SuspenseRouterOutlet } from "@/components/suspense-router-outlet";

import { PlanProgress } from "./components/plan-progress";
import { TabsNav } from "./components/tabs-nav";

export function TeamLayout() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <header className="flex flex-col gap-1">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">Equipe</h2>
        <p className="leading-7 text-muted-foreground">Gerenciar convites e equipes</p>
      </header>

      <PlanProgress />

      <div className="flex flex-col gap-4">
        <TabsNav />

        <SuspenseRouterOutlet />
      </div>
    </div>
  )
}
