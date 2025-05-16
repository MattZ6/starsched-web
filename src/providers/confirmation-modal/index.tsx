import { useCallback } from 'react'
import { useAtom } from 'jotai'

import { confirmationModalAtom } from '@/atoms/confirmation'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'

export function ConfirmationModalProvider() {
  const [{ open, confirmation }, setModal] = useAtom(confirmationModalAtom)

  const handleClose = useCallback(() => {
    setModal(modal => ({ ...modal, open: false }))

    if (confirmation?.onCancel) {
      confirmation.onCancel()
    }
  }, [confirmation, setModal])

  const handleConfirm = useCallback(() => {
    if (confirmation?.onConfirm) {
      confirmation?.onConfirm()
    }
  }, [confirmation])

  return (
    <AlertDialog open={open} onOpenChange={handleClose}>
      <AlertDialogContent>
        {confirmation?.icon && (
          <div className="flex items-center justify-center size-12 border border-border rounded-md">
            <confirmation.icon className="size-6" />
          </div>
        )}

        <AlertDialogHeader>
          <AlertDialogTitle>{confirmation?.title}</AlertDialogTitle>
          <AlertDialogDescription>{confirmation?.description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            {confirmation?.cancelButton.text}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            {confirmation?.confirmButton.text}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
