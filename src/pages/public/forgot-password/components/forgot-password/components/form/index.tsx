import { useCallback, useLayoutEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { zodResolver } from '@hookform/resolvers/zod'

import { Form } from '@/components/ui/form'
import { TextField } from '@/components/text-field'
import { Button } from '@/components/ui/button'

import { type ForgotPasswordFormSchemaInput, getForgotPasswordFormSchema } from './schema'

type Props = {
  onSend: (email: string) => void
}

export function ForgotPasswordForm({ onSend }: Props) {
  const { t } = useTranslation('forgot-password', { keyPrefix: 'forgot.page.form' })

  const forgotPasswordFormSchema = useMemo(() => getForgotPasswordFormSchema(t), [t])

  const form = useForm({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = useCallback(
    (input: ForgotPasswordFormSchemaInput) => {
      const { email } = input

      onSend(email)
    },
    [onSend],
  )

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
