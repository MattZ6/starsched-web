import { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { LogOut } from "lucide-react"

import { useConfirmation } from "@/hooks/use-confirmation"
import { useAuthentication } from "@/hooks/use-authentication"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

export function LogoutButton() {
  const { t } = useTranslation('base-layout', { keyPrefix: 'header.profile-menu.sign-out' })
  const { signOut } = useAuthentication()
  const { showConfirmation } = useConfirmation()

  const handleConfirm = useCallback(
    () => showConfirmation({
      icon: LogOut,
      title: t('confirmation-modal.title'),
      description: t('confirmation-modal.description'),
      cancelButton: { text: t('confirmation-modal.cancel-button.label') },
      confirmButton: { text: t('confirmation-modal.confirm-button.label') },
      onConfirm: signOut,
    }),
    [showConfirmation, signOut, t],
  )

  return (
    <DropdownMenuItem variant="destructive" onClick={handleConfirm}>
      <LogOut className="size-4" />
      {t('label')}
    </DropdownMenuItem>
  )
}
