import { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { LogOut } from "lucide-react"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

export function LogoutButton() {
  const { t } = useTranslation('base-layout', { keyPrefix: 'header.profile-menu.sign-out' })

  const handleConfirm = useCallback(
    () => {
      // TODO: Confirmar antes de fazer logout
    },
    [],
  )

  return (
    <DropdownMenuItem variant="destructive" onClick={handleConfirm} disabled>
      <LogOut className="size-4" />
      {t('label')}
    </DropdownMenuItem>
  )
}
