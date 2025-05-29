import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { InviteUserForm } from './components/form'

export function InviteButton() {
  const { t } = useTranslation('invites', { keyPrefix: 'invites.page.header.actions.invite' })
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleOpenChange = useCallback((open: boolean) => setIsOpen(open), [])

  const handleSuccess = useCallback(() => {
    setIsOpen(false)

    toast(
      t('form.success.toast.title'),
      {
        icon: <CheckCircle2 className="size-4" />,
        classNames: { title: 'text-sm' }
      }
    )
  }, [t])

  const handleOutsideInteractions = useCallback((event: Event) => {
    event.preventDefault();
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button type="button">
          {t('label')}
        </Button>
      </DialogTrigger>

      <DialogContent onInteractOutside={handleOutsideInteractions}>
        <DialogHeader>
          <DialogTitle>{t('form.title')}</DialogTitle>
          <DialogDescription>{t('form.description')}</DialogDescription>
        </DialogHeader>

        <InviteUserForm onSubmit={handleSuccess} />
      </DialogContent>
    </Dialog>
  )
}
