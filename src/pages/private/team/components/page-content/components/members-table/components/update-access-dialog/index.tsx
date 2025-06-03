import { useCallback, useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Ban, Bug, CheckCircle2, CircleAlert, IdCard, ServerOff } from "lucide-react";
import { toast } from "sonner"
import { useNavigate } from "react-router-dom";
import type { CompanyMember, UpdateCompanyMemberAccess } from "@starsched/sdk";

import { useAlert } from "@/hooks/use-alert";
import { useUpdateCompanyMemberAccess } from "@/hooks/services/starsched/use-update-company-member-access";
import { useAuthentication } from "@/hooks/use-authentication";

import { companyMembersEventNames } from "@/constants/company-members";

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

type Payload = {
  companyId: string
  companyName: string
  memberId: string
  memberName: string
  currentAccess: CompanyMember['access']
}

export function UpdateAccessDialog() {
  const { t } = useTranslation('members', { keyPrefix: 'members.page.table.row.actions.update-access.dialog' })
  const [payload, setPayload] = useState<Payload | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { showAlert } = useAlert()
  const { isPending, mutateAsync } = useUpdateCompanyMemberAccess()
  const { signOut } = useAuthentication()
  const navigate = useNavigate()

  const accessEnabled = payload?.currentAccess === 'enabled'

  const handleClose = useCallback(() => {
    if (!isPending) {
      setIsOpen(false)
    }
  }, [isPending])

  const onSuccess = useCallback(() => {
    setIsOpen(false)

    toast(
      t(`success.toast.title.${payload?.currentAccess === 'enabled' ? 'inactivated' : 'activated'}`),
      {
        icon: <CheckCircle2 className="size-4" />,
        classNames: { title: 'text-sm' }
      }
    )
  }, [t, payload?.currentAccess])

  const handleCloseWithInteractions = useCallback((event: Event) => {
    if (isPending) {
      event.preventDefault();
    }
  }, [isPending])

  const handleToggleAccess = useCallback(async () => {
    if (!payload) {
      return
    }

    try {
      await mutateAsync({
        companyId: payload.companyId,
        memberId: payload.memberId,
        access: payload.currentAccess === 'disabled' ? 'enabled' : 'disabled'
      })

      onSuccess()
    } catch (error) {
      if (isStarSchedError<UpdateCompanyMemberAccess.Failure>(error)) {
        if (
          error.code === 'token.expired'
          || error.code === 'token.invalid'
          || error.code === 'token.not.provided'
          || error.code === 'user.not.exists'
        ) {
          signOut()

          return
        }

        if (error.code === 'validation') {
          const { validation } = error

          if (validation.field === 'company_id') {
            showAlert({
              icon: Bug,
              title: t('errors.invalid-company-id.title'),
              description: t(`errors.invalid-company-id.description.${validation.type}`),
              closeButton: {
                text: t('errors.invalid-company-id.close-button.label')
              }
            })

            return
          }

          if (validation.field === 'member_id') {
            showAlert({
              icon: Bug,
              title: t('errors.invalid-member-id.title'),
              description: t(`errors.invalid-member-id.description.${validation.type}`),
              closeButton: {
                text: t('errors.invalid-member-id.close-button.label')
              }
            })

            return
          }

          if (validation.field === 'access') {
            showAlert({
              icon: Bug,
              title: t('errors.invalid-access.title'),
              description: t(`errors.invalid-access.description.${validation.type}`),
              closeButton: {
                text: t('errors.invalid-access.close-button.label')
              }
            })

            return
          }
        }

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

        if (error.code === 'company.member.not.exists') {
          showAlert({
            icon: IdCard,
            title: t('errors.company-member-not-exists.title'),
            description: t('errors.company-member-not-exists.description'),
            onClose: () => {
              eventUtils.emit(companyMembersEventNames.RESET_LIST)
              handleClose()
            },
            closeButton: {
              text: t('errors.company-member-not-exists.close-button.label'),
            }
          })

          return
        }

        if (error.code === 'company.current-user.member.update.denied') {
          showAlert({
            icon: Ban,
            title: t('errors.update-current-user-access-denied.title'),
            description: t('errors.update-current-user-access-denied.description'),
            closeButton: {
              text: t('errors.update-current-user-access-denied.close-button.label'),
            }
          })

          return
        }

        if (error.code === 'company.member.owner.denied') {
          showAlert({
            icon: Ban,
            title: t('errors.update-owner-access-denied.title'),
            description: t('errors.update-owner-access-denied.description'),
            closeButton: {
              text: t('errors.update-owner-access-denied.close-button.label'),
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
  }, [handleClose, mutateAsync, navigate, onSuccess, payload, showAlert, signOut, t])

  useEffect(() => {
    eventUtils.subscribe(companyMembersEventNames.OPEN_UPDATE_ACCESS_DIALOG, (event) => {
      if (eventUtils.isCustomEvent<Payload>(event)) {

        setPayload(event.detail)
        setIsOpen(true)
      }
    })

    return () => {
      eventUtils.unsubscribe(companyMembersEventNames.OPEN_UPDATE_ACCESS_DIALOG, () => { });
    }
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        onInteractOutside={handleCloseWithInteractions}
        onEscapeKeyDown={handleCloseWithInteractions}
      >
        <DialogHeader>
          <DialogTitle>{t(`title.${accessEnabled ? 'inactivate' : 'activate'}`)}</DialogTitle>
          <DialogDescription>
            <Trans
              t={t}
              i18nKey={`description.${accessEnabled ? 'inactivate' : 'activate'}`}
              values={{ user: payload?.memberName, company: payload?.companyName }}
              components={{ b: <b className="font-bold" /> }}
            />
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="ghost"
            onClick={handleClose}
            disabled={isPending}
          >
            {t('actions.cancel.label')}
          </Button>
          <Button
            type="button"
            variant={accessEnabled ? "destructive" : 'default'}
            onClick={handleToggleAccess}
            disabled={isPending}
          >
            {t(`actions.confirm.label.${accessEnabled ? 'inactivate' : 'activate'}`)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
