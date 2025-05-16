import { useCallback } from "react"
import { LogOut } from "lucide-react"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

export function LogoutButton() {
  const handleConfirm = useCallback(
    () => {
      // TODO: Confirmar antes de fazer logout
    },
    [],
  )

  return (
    <DropdownMenuItem variant="destructive" onClick={handleConfirm} disabled>
      <LogOut className="size-4" />
      Sair
    </DropdownMenuItem>
  )
}
