import { useCallback, useLayoutEffect, useMemo } from "react";
import { isStarSchedError } from "@/utils/is-starsched-error";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom";
import { CircleAlert } from "lucide-react";

import { useSignIn } from "@/hooks/services/starsched/use-sign-in";

import type { SignInWithEmailAndPassword } from "@starsched/sdk";

import { useAlert } from "@/hooks/use-alert";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/text-field";
import { PasswordField } from "@/components/password-field";

import { getSignInFormSchema, type SignInFormSchemaInput } from "./schema";

export function SignInForm() {
  const { t } = useTranslation('sign-in', { keyPrefix: 'page.form' });
  const navigate = useNavigate()
  const { showAlert } = useAlert()
  const { mutateAsync } = useSignIn()

  const signInFormSchema = useMemo(() => getSignInFormSchema(t), [t])

  const form = useForm({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = useCallback(async (input: SignInFormSchemaInput) => {
    const { email, password } = input

    try {
      await mutateAsync({ email, password })

      navigate('/', { replace: true })
    } catch (error) {
      if (isStarSchedError<SignInWithEmailAndPassword.Failure>(error)) {
        if (error.code === 'validation') {
          const { validation } = error

          form.setError(
            validation.field,
            { message: t(`fields.${validation.field}.validation.${validation.type}`) },
            { shouldFocus: true }
          )

          return;
        }

        if (error.code === 'user.not.exists') {
          form.setError(
            'email',
            { message: t('fields.email.validation.not-found') },
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
  }, [form, mutateAsync, navigate, showAlert, t])

  useLayoutEffect(() => form.setFocus('email'), [form])

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <TextField
          control={form.control}
          name="email"
          label={t('fields.email.label')}
          disabled={form.formState.isSubmitting}
        />

        <PasswordField
          control={form.control}
          name="password"
          label={t('fields.password.label')}
          showPasswordLabel={t('fields.password.show-password.show')}
          hidePasswordLabel={t('fields.password.show-password.hide')}
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
