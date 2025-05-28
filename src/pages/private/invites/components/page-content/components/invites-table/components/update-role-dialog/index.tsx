import { useCallback, useEffect, useState } from "react";
import type { CompanyInvite } from "@starsched/sdk";
import { useTranslation } from "react-i18next";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner"

import { EventUtils } from "@/utils/event";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { UpdateRoleForm } from "./components/form";

const eventUtils = new EventUtils()
const UPDATE_INVITE_ROLE_EVENT_NAME = 'update-invite-role'

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

  const handleClose = useCallback(() => setDialogValue({
    isOpen: false,
    invitePayload: null,
  }), [])

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

  useEffect(() => {
    eventUtils.subscribe(UPDATE_INVITE_ROLE_EVENT_NAME, (event) => {
      if (eventUtils.isCustomEvent<Payload>(event)) {

        setDialogValue({ isOpen: true, invitePayload: event.detail })
      }
    })

    return () => {
      eventUtils.unsubscribe(UPDATE_INVITE_ROLE_EVENT_NAME, () => { });
    }
  }, [])

  return (
    <Dialog open={dialogValue.isOpen} onOpenChange={handleClose}>
      <DialogContent onInteractOutside={handleOutsideInteractions}>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>

        <UpdateRoleForm
          companyId={dialogValue.invitePayload?.companyId}
          inviteId={dialogValue.invitePayload?.inviteId}
          currentRole={dialogValue.invitePayload?.currentRole}
          onSubmit={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  )
}
