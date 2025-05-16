import { useCallback, useLayoutEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { CircleAlert, CircleOff, SearchX, TimerOff, UserCircle2Icon } from "lucide-react";

import { useAlert } from "@/hooks/use-alert";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { PasswordField } from "@/components/password-field";

import { type CompanySignUpConfirmationFormSchemaInput, getCompanySignUpConfirmationFormSchema } from "./schema";
import { useFinalizeCompanySignUpRequest } from "@/hooks/services/starsched/use-finalize-company-sign-up-request";
import { useSignIn } from "@/hooks/services/starsched/use-sign-in";

type Props = {
  ownerName: string;
  ownerEmail: string;
  code: string;
}

export function CompanySignUpConfirmationForm({ ownerName, ownerEmail, code }: Props) {
  const { t } = useTranslation('account-confirmation', { keyPrefix: 'account-confirmation.page.form' });
  const navigate = useNavigate()
  const { showAlert } = useAlert()
  const { mutateAsync: finalizeAsync } = useFinalizeCompanySignUpRequest()
  const { mutateAsync: signInAsync } = useSignIn()

  const companySignUpConfirmationFormSchema = useMemo(
    () => getCompanySignUpConfirmationFormSchema(t),
    [t]
  )

  const form = useForm({
    resolver: zodResolver(companySignUpConfirmationFormSchema),
    defaultValues: {
      password: '',
      password_confirmation: ''
    }
  })

  const onSubmit = useCallback(async (input: CompanySignUpConfirmationFormSchemaInput) => {
    const { password, password_confirmation } = input

    try {
      const finalizeOutput = await finalizeAsync({
        token: code,
        owner: {
          name: ownerName,
          password: password,
          passwordConfirmation: password_confirmation
        }
      })

      if (finalizeOutput.error) {
        if (finalizeOutput.error.code === 'validation') {
          const { validation } = finalizeOutput.error

          if (validation.field === 'password' || validation.field === 'password_confirmation') {
            form.setError(
              validation.field,
              {
                message: t(
                  `fields.${validation.field}.validation.${validation.type}`,
                  { [validation.type]: validation?.value ?? '' }
                )
              },
              { shouldFocus: true }
            )

            return;
          }

          if (validation.field === 'token') {
            showAlert({
              icon: CircleOff,
              title: t('errors.invalid-confirmation-code.title'),
              description: t('errors.invalid-confirmation-code.description'),
              closeButton: {
                text: t('errors.invalid-confirmation-code.close-button.label')
              }
            })

            return;
          }
        }

        if (finalizeOutput.error.code === 'user.account.creation.request.token.not.exists') {
          showAlert({
            icon: SearchX,
            title: t('errors.confirmation-code-not-found.title'),
            description: t('errors.confirmation-code-not-found.description'),
            onClose: () => navigate('/sign-up', { replace: true }),
            closeButton: {
              text: t('errors.confirmation-code-not-found.close-button.label'),
            }
          })

          return;
        }

        if (finalizeOutput.error.code === 'user.account.creation.request.token.expired') {
          showAlert({
            icon: TimerOff,
            title: t('errors.confirmation-code-expired.title'),
            description: t('errors.confirmation-code-expired.description'),
            onClose: () => navigate('/sign-up', { replace: true }),
            closeButton: {
              text: t('errors.confirmation-code-expired.close-button.label')
            }
          })

          return;
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

      const signInOutput = await signInAsync({
        email: ownerEmail,
        password: password,
      })

      if (signInOutput.error) {
        showAlert({
          icon: CircleAlert,
          title: t('errors.authentication-error.title'),
          description: t('errors.authentication-error.description'),
          onClose: () => navigate('/sign-in', { replace: true }),
          closeButton: {
            text: t('errors.authentication-error.close-button.label')
          }
        })

      }

      navigate('/', { replace: true })
    } catch {
      showAlert({
        icon: CircleAlert,
        title: t('errors.exception.title'),
        description: t('errors.exception.description'),
        closeButton: {
          text: t('errors.exception.close-button.label')
        }
      })
    }
  }, [code, finalizeAsync, form, navigate, ownerEmail, ownerName, showAlert, signInAsync, t])

  useLayoutEffect(() => form.setFocus('password'), [form])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <div className="flex items-center gap-4 p-3 rounded-md border border-border mb-4">
          <div className="flex items-center justify-center rounded-md border border-border size-9">
            <UserCircle2Icon className="size-5 text-foreground" />
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">{ownerName}</span>
            <span className="text-sm text-muted-foreground">{ownerEmail}</span>
          </div>
        </div>

        <PasswordField
          control={form.control}
          name="password"
          label={t('fields.password.label')}
          hidePasswordLabel={t('fields.password.show-password.hide')}
          showPasswordLabel={t('fields.password.show-password.show')}
          disabled={form.formState.isSubmitting}
        />

        <PasswordField
          control={form.control}
          name="password_confirmation"
          label={t('fields.password_confirmation.label')}
          hidePasswordLabel={t('fields.password_confirmation.show-password.hide')}
          showPasswordLabel={t('fields.password_confirmation.show-password.show')}
          disabled={form.formState.isSubmitting}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {t('actions.submit.label')}
        </Button>
      </form>
    </Form>
  )
}
