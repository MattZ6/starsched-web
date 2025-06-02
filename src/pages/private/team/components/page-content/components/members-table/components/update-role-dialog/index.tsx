import { useCallback, useEffect, useRef, useState } from "react";
import type { CompanyMember } from "@starsched/sdk";
import { useTranslation } from "react-i18next";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner"

import { EventUtils } from "@/utils/event";

import { companyMembersEventNames } from "@/constants/company-members";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { UpdateRoleForm } from "./components/form";

const eventUtils = new EventUtils()

type Payload = {
  companyId: string
  memberId: string
  currentRole: Exclude<CompanyMember['role'], 'owner'>
}

type State = {
  isOpen: boolean
  memberPayload: Payload | null
}

export function UpdateRoleDialog() {
  const { t } = useTranslation('members', { keyPrefix: 'members.page.table.row.actions.update-role.form' })
  const [dialogValue, setDialogValue] = useState<State>({ isOpen: false, memberPayload: null })
  const canCloseRef = useRef(true)

  const handleClose = useCallback((open: boolean) => {
    if (!open && canCloseRef.current) {
      setDialogValue({
        isOpen: false,
        memberPayload: null,
      })
    }
  }, [])

  const handleSuccess = useCallback(() => {
    setDialogValue({
      isOpen: false,
      memberPayload: null,
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
    eventUtils.subscribe(companyMembersEventNames.OPEN_UPDATE_ROLE_DIALOG, (event) => {
      if (eventUtils.isCustomEvent<Payload>(event)) {
        setDialogValue({ isOpen: true, memberPayload: event.detail })
        canCloseRef.current = true
      }
    })

    return () => {
      eventUtils.unsubscribe(companyMembersEventNames.OPEN_UPDATE_ROLE_DIALOG, () => { });
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
          companyId={dialogValue.memberPayload?.companyId}
          memberId={dialogValue.memberPayload?.memberId}
          currentRole={dialogValue.memberPayload?.currentRole}
          onSubmit={handleSuccess}
          onSubmitingStatusChanged={handleSubmitStatusChanged}
        />
      </DialogContent>
    </Dialog>
  )
}
