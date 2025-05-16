import { z } from "zod";

type TFunction = (key: string) => string

export function getSignInFormSchema(t: TFunction) {
  return z.object({
    email: z
      .string()
      .trim()
      .min(1, t('fields.email.validation.required'))
      .email(t('fields.email.validation.invalid')),
    password: z
      .string()
      .min(1, t('fields.password.validation.required'))
  })
}

export type SignInFormSchemaInput = z.infer<ReturnType<typeof getSignInFormSchema>>
