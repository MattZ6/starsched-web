import { useCallback, useEffect, useRef, useState } from "react";
import type { CompanyInvite } from "@starsched/sdk";
import { useTranslation } from "react-i18next";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner"

import { EventUtils } from "@/utils/event";

import { companyInvitesEventNames } from "@/constants/company-invites";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { UpdateRoleForm } from "./components/form";

const eventUtils = new EventUtils()

type Payload = {
  companyId: string
  inviteId: string
  currentRole: CompanyInvite['role']
}

type State = {
  isOpen: boolean
  invitePayload: Payload | null
}

export function UpdateRoleDialog() {
  const { t } = useTranslation('invites', { keyPrefix: 'invites.page.table.row.actions.update-role.form' })
  const [dialogValue, setDialogValue] = useState<State>({ isOpen: false, invitePayload: null })
  const canCloseRef = useRef(true)

  const handleClose = useCallback((open: boolean) => {
    if (!open && canCloseRef.current) {
      setDialogValue({
        isOpen: false,
        invitePayload: null,
      })
    }
  }, [])

  const handleSuccess = useCallback(() => {
    setDialogValue({
      isOpen: false,
      invitePayload: null,
    })

    toast(
      t('success.toast.title'),
      {
        icon: <CheckCircle2 className="size-4" />,
        classNames: { title: 'text-sm' }
      }
    )
  }, [t])

  const handleOutsideInteractions = useCallback((event: Event) => {
    event.preventDefault();
  }, [])

  const handleEscButtonClicked = useCallback((event: Event) => {
    const canClose = canCloseRef.current

    if (!canClose) {
      event.preventDefault();
    }
  }, [])

  const handleSubmitStatusChanged = useCallback((isSubmiting: boolean) => {
    canCloseRef.current = isSubmiting;
  }, [])

  useEffect(() => {
    eventUtils.subscribe(companyInvitesEventNames.OPEN_UPDATE_ROLE_DIALOG, (event) => {
      if (eventUtils.isCustomEvent<Payload>(event)) {
        setDialogValue({ isOpen: true, invitePayload: event.detail })
        canCloseRef.current = true
      }
    })

    return () => {
      eventUtils.unsubscribe(companyInvitesEventNames.OPEN_UPDATE_ROLE_DIALOG, () => { });
    }
  }, [])

  return (
    <Dialog open={dialogValue.isOpen} onOpenChange={handleClose}>
      <DialogContent
        onInteractOutside={handleOutsideInteractions}
        onEscapeKeyDown={handleEscButtonClicked}
      >
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>

        <UpdateRoleForm
          companyId={dialogValue.invitePayload?.companyId}
          inviteId={dialogValue.invitePayload?.inviteId}
          currentRole={dialogValue.invitePayload?.currentRole}
          onSubmit={handleSuccess}
          onSubmitingStatusChanged={handleSubmitStatusChanged}
        />
      </DialogContent>
    </Dialog>
  )
}
