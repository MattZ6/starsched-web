import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const MAX_MEMBERS = 5
const MEMBERS_COUNT = 4

export function PlanProgress() {
  return (
    <article className="flex flex-col border border-border rounded-md">
      <div className="flex items-center gap-6 p-4">
        <div className="flex flex-col gap-1">
          <span className="text-xl font-semibold tracking-tight">Plano Pro</span>
          <p className="text-muted-foreground">
            Nosso plano mais popular para clínicas de médio porte. Até {MAX_MEMBERS} membros.
          </p>
        </div>

        <span className="font-semibold text-3xl tracking-tight ml-auto">
          Gratuito
        </span>
      </div>

      <Separator />

      <div className="flex items-center gap-4 p-4">
        <Progress value={(MEMBERS_COUNT / MAX_MEMBERS) * 100} />
        <span className="shrink-0 text-sm text-nowrap">{MEMBERS_COUNT} de {MAX_MEMBERS} membros</span>
      </div>
    </article>
  )
}
