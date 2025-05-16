import { app } from "@/constants/app"

const lastBuildYear = new Date().getFullYear()

export function Footer() {
  return (
    <footer>
      <div className="grid grid-cols-3 gap-4 px-6 max-w-7xl mx-auto min-h-16">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {lastBuildYear} © {app.name}
          </span>

          {app.isBeta && (
            <span className="text-xs text-muted-foreground rounded-full border px-1.5">
              beta
            </span>
          )}
        </div>

        <span className="flex items-center justify-center text-center text-xs text-muted-foreground">
          {app.version}
        </span>

        <div>
         {/* TODO: Adicionar um theme switcher */}
         {/* TODO: Adicionar um language switcher */}
        </div>
      </div>
    </footer>
  )
}
