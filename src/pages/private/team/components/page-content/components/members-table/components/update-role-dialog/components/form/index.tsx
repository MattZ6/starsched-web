import { useCallback, useLayoutEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import type { CompanyMember, UpdateCompanyMemberRole } from "@starsched/sdk";
import { Ban, Bug, CircleAlert, ServerOff } from "lucide-react";

import { isStarSchedError } from "@/utils/is-starsched-error";
import { EventUtils } from "@/utils/event";

import { companyMembersEventNames } from "@/constants/company-members";

import { useAlert } from "@/hooks/use-alert";
import { useAuthentication } from "@/hooks/use-authentication";
import { useUpdateCompanyMemberRole } from "@/hooks/services/starsched/use-update-company-member-role";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import { SelectField } from "@/components/select-field";

import { getUpdateMemberRoleSchema, type UpdateMemberRoleSchemaInput } from "./schema";
import { companyPlanEventNames } from "@/constants/company-plan";

const eventUtils = new EventUtils()

type Props = {
  companyId?: string
  memberId?: string
  currentRole?: Exclude<CompanyMember['role'], 'owner'>
  onSubmit: () => void
  onSubmitingStatusChanged: (isSubmiting: boolean) => void
}

export function UpdateRoleForm({ companyId, memberId, currentRole, onSubmit, onSubmitingStatusChanged }: Props) {
  const { t } = useTranslation('members', { keyPrefix: 'members.page.table.row.actions.update-role.form' });
  const { t: commonT } = useTranslation('common', { keyPrefix: 'company.role' })
  const { showAlert } = useAlert()
  const { mutateAsync } = useUpdateCompanyMemberRole()
  const { signOut } = useAuthentication()
  const navigate = useNavigate()

  const updateMemberRoleSchema = useMemo(() => getUpdateMemberRoleSchema(t), [t])

  const form = useForm({
    resolver: zodResolver(updateMemberRoleSchema),
    defaultValues: {
      role: currentRole!
    }
  })

  const onFormSubmit = useCallback(async (input: UpdateMemberRoleSchemaInput) => {
    if (!companyId || !memberId) {
      return
    }

    onSubmitingStatusChanged(false)

    const { role } = input

    try {
      await mutateAsync({ companyId, memberId, role })

      onSubmit()
    } catch (error) {
      if (isStarSchedError<UpdateCompanyMemberRole.Failure>(error)) {
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
            icon: ServerOff,
            title: t('errors.company-member-not-exists.title'),
            description: t('errors.company-member-not-exists.description'),
            onClose: () => {
              eventUtils.emit(companyMembersEventNames.RESET_LIST)
              eventUtils.emit(companyPlanEventNames.MEMBERS_COUNT_UPDATED)
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

        if (error.code === 'company.member.owner.role.denied') {
          showAlert({
            icon: Ban,
            title: t('errors.update-to-owner-access-denied.title'),
            description: t('errors.update-to-owner-access-denied.description'),
            closeButton: {
              text: t('errors.update-to-owner-access-denied.close-button.label'),
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
    } finally {
      onSubmitingStatusChanged(true)
    }
  }, [companyId, form, memberId, mutateAsync, navigate, onSubmit, onSubmitingStatusChanged, showAlert, signOut, t])

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
