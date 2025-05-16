import { z } from "zod";

type TFunction = (key: string, options?: Record<string, string | number | Date>) => string

const PASSWORD_MIN_LENGTH = 8;

export function getCompanySignUpConfirmationFormSchema(t: TFunction) {
  return z.object({
    password: z
      .string()
      .min(1, t('fields.password.validation.required'))
      .min(
        PASSWORD_MIN_LENGTH,
        t('fields.password.validation.minlength', {
          minlength: PASSWORD_MIN_LENGTH
        })
      ),
    password_confirmation: z
      .string()
      .min(1, t('fields.password_confirmation.validation.required'))
      .min(
        PASSWORD_MIN_LENGTH,
        t('fields.password_confirmation.validation.minlength', {
          minlength: PASSWORD_MIN_LENGTH
        })
      )
  }).refine((data) => data.password === data.password_confirmation, {
    path: ['password_confirmation'],
    message: t('fields.password_confirmation.validation.divergent'),
  })
}

export type CompanySignUpConfirmationFormSchemaInput = z.infer<ReturnType<typeof getCompanySignUpConfirmationFormSchema>>
