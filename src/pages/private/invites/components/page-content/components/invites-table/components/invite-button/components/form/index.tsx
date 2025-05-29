import { useCallback, useLayoutEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import type { CreateCompanyInvite } from "@starsched/sdk";
import { Ban, Bug, CircleAlert, ServerOff } from "lucide-react";

import { isStarSchedError } from "@/utils/is-starsched-error";

import { useAlert } from "@/hooks/use-alert";
import { useAuthentication } from "@/hooks/use-authentication";
import { useSelectedCompany } from "@/hooks/use-selected-company";
import { useCreateCompanyInvite } from "@/hooks/services/starsched/use-create-company-invite";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import { SelectField } from "@/components/select-field";
import { TextField } from "@/components/text-field";

import { getInviteUserSchema, type InviteUserSchemaInput } from "./schema";

type Props = {
  onSubmit: () => void
}

export function InviteUserForm({ onSubmit }: Props) {
  const { t } = useTranslation('invites', { keyPrefix: 'invites.page.header.actions.invite.form' });
  const { t: commonT } = useTranslation('common', { keyPrefix: 'company.role' })
  const { showAlert } = useAlert()
  const selectedCompany = useSelectedCompany()
  const { mutateAsync } = useCreateCompanyInvite()
  const { signOut } = useAuthentication()
  const navigate = useNavigate()

  const updateInviteRoleSchema = useMemo(() => getInviteUserSchema(t), [t])

  const form = useForm<InviteUserSchemaInput>({
    resolver: zodResolver(updateInviteRoleSchema),
    defaultValues: {
      email: '',
      role: 'collaborator',
    }
  })

  const onFormSubmit = useCallback(async (input: InviteUserSchemaInput) => {
    if (!selectedCompany?.id) {
      return
    }

    const { email, role } = input

    try {
      await mutateAsync({ companyId: selectedCompany.id, email, role })

      onSubmit()
    } catch (error) {
      if (isStarSchedError<CreateCompanyInvite.Failure>(error)) {
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

          setTimeout(() => {
            form.setError(
              validation.field,
              {
                message: t(
                  `fields.${validation.field}.validation.${validation.type}`
                )
              },
              { shouldFocus: true }
            )
          }, 0);

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

        if (error.code === 'company.invite.exists') {
          setTimeout(() => {
            form.setError(
              'email',
              { message: t('fields.email.validation.invite-exists') },
              { shouldFocus: true }
            )
          }, 0);

          return
        }

        if (error.code === 'company.member.exists') {
          setTimeout(() => {
            form.setError(
              'email',
              { message: t('fields.email.validation.already-member') },
              { shouldFocus: true }
            )
          }, 0);

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
  }, [form, mutateAsync, navigate, onSubmit, selectedCompany?.id, showAlert, signOut, t])

  useLayoutEffect(() => form.setFocus('email'), [form])

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onFormSubmit)}
        className="flex flex-col gap-2"
      >
        <div className="flex items-start gap-3">
          <TextField
            control={form.control}
            name="email"
            disabled={form.formState.isSubmitting}
            label={t('fields.email.label')}
            type="email"
            className="flex-2/3"
          />

          <SelectField
            control={form.control}
            name="role"
            disabled={form.formState.isSubmitting}
            label={t('fields.role.label')}
            className="flex-1/3"
          >
            <SelectItem value="collaborator">{commonT('collaborator')}</SelectItem>
            <SelectItem value="manager">{commonT('manager')}</SelectItem>
          </SelectField>
        </div>

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
