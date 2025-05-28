import { useCallback, useLayoutEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import type { CompanyInvite, UpdateCompanyInviteRole } from "@starsched/sdk";
import { Ban, Bug, CircleAlert, MailOpen, ServerOff, TimerOff } from "lucide-react";

import { isStarSchedError } from "@/utils/is-starsched-error";

import { useAlert } from "@/hooks/use-alert";
import { useAuthentication } from "@/hooks/use-authentication";
import { useUpdateCompanyInviteRole } from "@/hooks/services/starsched/use-update-company-invite-role";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import { SelectField } from "@/components/select-field";

import { getUpdateInviteRoleSchema, type UpdateInviteRoleSchemaInput } from "./schema";

type Props = {
  companyId?: string
  inviteId?: string
  currentRole?: CompanyInvite['role']
  onSubmit: () => void
}

export function UpdateRoleForm({ companyId, inviteId, currentRole, onSubmit }: Props) {
  const { t } = useTranslation('invites', { keyPrefix: 'invites.page.table.row.actions.update-role.form' });
  const { t: commonT } = useTranslation('common', { keyPrefix: 'company.role' })
  const { showAlert } = useAlert()
  const { mutateAsync } = useUpdateCompanyInviteRole()
  const { signOut } = useAuthentication()
  const navigate = useNavigate()

  const updateInviteRoleSchema = useMemo(() => getUpdateInviteRoleSchema(t), [t])

  const form = useForm({
    resolver: zodResolver(updateInviteRoleSchema),
    defaultValues: {
      role: currentRole!
    }
  })

  const onFormSubmit = useCallback(async (input: UpdateInviteRoleSchemaInput) => {
    if (!companyId || !inviteId) {
      return
    }

    const { role } = input

    try {
      await mutateAsync({ companyId, inviteId, role })

      onSubmit()
    } catch (error) {
      if (isStarSchedError<UpdateCompanyInviteRole.Failure>(error)) {
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

          if (validation.field === 'role') {
            form.setError(
              'role',
              {
                message: t(
                  `fields.${validation.field}.validation.${validation.type}`
                )
              },
              { shouldFocus: true }
            )

            return
          }

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

          if (validation.field === 'invite_id') {
            showAlert({
              icon: Bug,
              title: t('errors.invalid-invite-id.title'),
              description: t(`errors.invalid-invite-id.description.${validation.type}`),
              closeButton: {
                text: t('errors.invalid-invite-id.close-button.label')
              }
            })

            return
          }

          return
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

        if (error.code === 'company.invite.not.exists') {
          showAlert({
            icon: ServerOff,
            title: t('errors.company-invite-not-exists.title'),
            description: t('errors.company-invite-not-exists.description'),
            onClose: () => navigate('/', { replace: true }),
            closeButton: {
              text: t('errors.company-invite-not-exists.close-button.label'),
            }
          })

          return
        }

        if (error.code === 'company.invite.expired') {
          showAlert({
            icon: TimerOff,
            title: t('errors.company-invite-expired.title'),
            description: t('errors.company-invite-expired.description'),
            closeButton: {
              text: t('errors.company-invite-expired.close-button.label'),
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
  }, [companyId, form, inviteId, mutateAsync, navigate, onSubmit, showAlert, signOut, t])

  useLayoutEffect(() => form.setFocus('role'), [form])

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onFormSubmit)}
        className="flex flex-col gap-2"
      >
        <SelectField
          control={form.control}
          name="role"
          disabled={form.formState.isSubmitting}
          label={t('fields.role.label')}
        >
          <SelectItem value="collaborator">{commonT('collaborator')}</SelectItem>
          <SelectItem value="manager">{commonT('manager')}</SelectItem>
        </SelectField>

        <div className="flex items-center justify-end gap-2">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="self-end"
          >
            {t('actions.submit.label')}
          </Button>
        </div>
      </form>
    </Form>
  )
}
