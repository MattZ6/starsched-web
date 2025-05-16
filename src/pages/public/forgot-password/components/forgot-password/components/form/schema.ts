import { z } from 'zod'

type TFunction = (key: string) => string

export function getForgotPasswordFormSchema(t: TFunction) {
  return z.object({
    email: z
      .string()
      .trim()
      .min(1, t('fields.email.validation.required'))
      .email(t('fields.email.validation.invalid')),
  })
}

export type ForgotPasswordFormSchemaInput = z.infer<ReturnType<typeof getForgotPasswordFormSchema>>


