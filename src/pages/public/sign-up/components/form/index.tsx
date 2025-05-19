import { useCallback, useLayoutEffect, useMemo } from "react";
import type { RequestCompanySignUp } from "@starsched/sdk";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { CircleAlert } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useRequestCompanySignUp } from "@/hooks/services/starsched/use-request-company-sign-up";
import { useAlert } from "@/hooks/use-alert";

import { isStarSchedError } from "@/utils/is-starsched-error";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { getSignUpFormSchema, type SignUpFormSchemaInput } from "./schema";
import { TextField } from "@/components/text-field";

type Props = {
  onSubmit: (ownerEmail: string) => void
}

export function SignUpForm({ onSubmit }: Props) {
  const { t } = useTranslation('sign-up', { keyPrefix: 'create-account.page.form' });
  const { showAlert } = useAlert()
  const { mutateAsync } = useRequestCompanySignUp()

  const signUpFormSchema = useMemo(() => getSignUpFormSchema(t), [t])

  const form = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      owner_name: '',
      owner_email: '',
      company_name: ''
    }
  })

  const onFormSubmit = useCallback(async (input: SignUpFormSchemaInput) => {
    const { owner_name, owner_email, company_name } = input

    try {
      await mutateAsync({
        owner: {
          name: owner_name,
          email: owner_email,
        },
        company: {
          name: company_name,
        }
      })

      onSubmit(owner_email);
    } catch (error) {
      if (isStarSchedError<RequestCompanySignUp.Failure>(error)) {
        if (error.code === 'validation') {
          const { validation } = error

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

        if (error.code === 'user.email.exists') {
          form.setError(
            'owner_email',
            { message: t('fields.owner_email.validation.already-exists') },
            { shouldFocus: true }
          )

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

      showAlert({
        icon: CircleAlert,
        title: t('errors.exception.title'),
        description: t('errors.exception.description'),
        closeButton: {
          text: t('errors.exception.close-button.label')
        }
      })
    }
  }, [form, mutateAsync, onSubmit, showAlert, t])

  useLayoutEffect(() => form.setFocus('company_name'), [form])

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onFormSubmit)}
        className="flex flex-col gap-2"
      >
        <TextField
          control={form.control}
          name="company_name"
          disabled={form.formState.isSubmitting}
          label={t('fields.company_name.label')}
        />

        <TextField
          control={form.control}
          name="owner_name"
          disabled={form.formState.isSubmitting}
          label={t('fields.owner_name.label')}
        />

        <TextField
          control={form.control}
          name="owner_email"
          type="email"
          disabled={form.formState.isSubmitting}
          label={t('fields.owner_email.label')}
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
