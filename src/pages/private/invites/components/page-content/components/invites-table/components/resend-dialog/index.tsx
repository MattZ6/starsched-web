import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Ban, Bug, CheckCircle2, CircleAlert, MailOpen, ServerOff, TimerReset } from "lucide-react";
import { toast } from "sonner"
import { useNavigate } from "react-router-dom";
import type { ResendCompanyInvite } from "@starsched/sdk";

import { useAlert } from "@/hooks/use-alert";
import { useResendCompanyInvite } from "@/hooks/services/starsched/use-resend-company-invite";
import { useAuthentication } from "@/hooks/use-authentication";

import { EventUtils } from "@/utils/event";
import { isStarSchedError } from "@/utils/is-starsched-error";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const eventUtils = new EventUtils()
const RESEND_INVITE_EVENT_NAME = 'resend-company-invite'

type Payload = {
  companyId: string
  inviteId: string
}

type State = {
  isOpen: boolean
  invitePayload: Payload | null
}

export function ResendDialog() {
  const { t } = useTranslation('invites', { keyPrefix: 'invites.page.table.row.actions.resend.dialog' })
  const [dialogValue, setDialogValue] = useState<State>({ isOpen: false, invitePayload: null })
  const { showAlert } = useAlert()
  const { isPending, mutateAsync } = useResendCompanyInvite()
  const { signOut } = useAuthentication()
  const navigate = useNavigate()

  const handleClose = useCallback(() => {
    if (!isPending) {
      setDialogValue({
        isOpen: false,
        invitePayload: null,
      })
    }
  }, [isPending])

  const onSuccess = useCallback(() => {
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

  const handleCloseWithInteractions = useCallback((event: Event) => {
    if (isPending) {
      event.preventDefault();
    }
  }, [isPending])

  const handleResend = useCallback(async () => {
    const { companyId, inviteId } = dialogValue.invitePayload ?? {}

    if (!companyId || !inviteId) {
      return
    }

    try {
      await mutateAsync({ companyId: 'x', inviteId })

      onSuccess()
    } catch (error) {
      if (isStarSchedError<ResendCompanyInvite.Failure>(error)) {
        if (error.code === 'token.expired' || error.code === 'token.invalid' || error.code === 'token.not.provided' || error.code === 'user.not.exists') {
          signOut()

          return
        }

        // if (error.code === 'validation') {
        //   const { validation } = error

        //   if (validation.field === 'company_id') {
        //     showAlert({
        //       icon: Bug,
        //       title: t('errors.invalid-company-id.title'),
        //       description: t(`errors.invalid-company-id.description.${validation.type}`),
        //       closeButton: {
        //         text: t('errors.invalid-company-id.close-button.label')
        //       }
        //     })

        //     return
        //   }

        //   if (validation.field === 'invite_id') {
        //     showAlert({
        //       icon: Bug,
        //       title: t('errors.invalid-invite-id.title'),
        //       description: t(`errors.invalid-invite-id.description.${validation.type}`),
        //       closeButton: {
        //         text: t('errors.invalid-invite-id.close-button.label')
        //       }
        //     })

        //     return
        //   }
        // }

        if (error.code === 'access.denied') {
          showAlert({
            icon: Ban,
            title: t('errors.access-denied.title'),
            description: t('errors.access-denied.description'),
            onClose: () => navigate('/', { replace: true }),
            closeButton: {
              text: t('errors.access-denied.close-button.label'),
            }
          })

          return
        }

        if (error.code === 'company.not.exists') {
          showAlert({
            icon: ServerOff,
            title: t('errors.company-not-exists.title'),
            description: t('errors.company-not-exists.description'),
            onClose: () => navigate('/', { replace: true }),
            closeButton: {
              text: t('errors.company-not-exists.close-button.label'),
            }
          })

          return
        }

        if (error.code === 'company.invite.not.exists') {
          showAlert({
            icon: ServerOff,
            title: t('errors.company-invite-not-exists.title'),
            description: t('errors.company-invite-not-exists.description'),
            onClose: () => {
              // TODO: Resetar a query pra consultar os convites novamente (mandar pra primeira página)

              handleClose()
            },
            closeButton: {
              text: t('errors.company-invite-not-exists.close-button.label'),
            }
          })

          return
        }

        if (error.code === 'company.invite.status.not.pending') {
          showAlert({
            icon: MailOpen,
            title: t('errors.company-invite-not-pending.title'),
            description: t('errors.company-invite-not-pending.description'),
            closeButton: {
              text: t('errors.company-invite-not-pending.close-button.label'),
            }
          })

          return
        }

        if (error.code === 'company.invite.not.expired') {
          showAlert({
            icon: TimerReset,
            title: t('errors.company-invite-not-expired.title'),
            description: t('errors.company-invite-not-expired.description'),
            closeButton: {
              text: t('errors.company-invite-not-expired.close-button.label'),
            }
          })

          return
        }

        showAlert({
          icon: CircleAlert,
          title: t('errors.internal.title'),
          description: t('errors.internal.description'),
          closeButton: {
            text: t('errors.internal.close-button.label')
          }
        })

        return;
      }

      showAlert({
        icon: Bug,
        title: t('errors.exception.title'),
        description: t('errors.exception.description'),
        closeButton: {
          text: t('errors.exception.close-button.label')
        }
      })
    }
  }, [dialogValue.invitePayload, handleClose, mutateAsync, navigate, onSuccess, showAlert, signOut, t])

  useEffect(() => {
    eventUtils.subscribe(RESEND_INVITE_EVENT_NAME, (event) => {
      if (eventUtils.isCustomEvent<Payload>(event)) {

        setDialogValue({ isOpen: true, invitePayload: event.detail })
      }
    })

    return () => {
      eventUtils.unsubscribe(RESEND_INVITE_EVENT_NAME, () => { });
    }
  }, [])

  return (
    <Dialog open={dialogValue.isOpen} onOpenChange={handleClose}>
      <DialogContent
        onInteractOutside={handleCloseWithInteractions}
        onEscapeKeyDown={handleCloseWithInteractions}
      >
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="button" variant="ghost" onClick={handleClose} disabled={isPending}>
            {t('actions.cancel.label')}
          </Button>
          <Button type="button" onClick={handleResend} disabled={isPending}>
            {t('actions.confirm.label')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
