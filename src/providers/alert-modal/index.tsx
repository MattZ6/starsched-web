import { useCallback } from 'react'
import { useAtom } from 'jotai'
import { alertModalAtom } from '@/atoms/alert'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'

export function AlertModalProvider() {
  const [{ open, alert }, setModal] = useAtom(alertModalAtom)

  const handleClose = useCallback(() => {
    setModal(modal => ({ ...modal, open: false }))

    if (alert?.onClose) {
      alert.onClose()
    }
  }, [alert, setModal])

  return (
    <Dialog open={open} onOpenChange={handleClose} >
      <DialogContent >
        {alert?.icon && (
          <div className="flex items-center justify-center size-12 border border-border rounded-md">
            <alert.icon className="size-6" />
          </div>
        )}

        <DialogHeader>
          <DialogTitle>{alert?.title}</DialogTitle>
          <DialogDescription>{alert?.description}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button onClick={handleClose}>
            {alert?.closeButton?.text}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
