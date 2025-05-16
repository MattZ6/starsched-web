import { z } from "zod";

type TFunction = (key: string, options?: Record<string, string | number | Date>) => string

export const COMPANY_NAME_MIN_LENGTH = 3
export const OWNER_NAME_MIN_LENGTH = 3

export function getSignUpFormSchema(t: TFunction) {
  return z.object({
    company_name: z
      .string()
      .trim()
      .min(1, t('fields.company_name.validation.required'))
      .min(
        COMPANY_NAME_MIN_LENGTH,
        t('fields.company_name.validation.minlength', {
          minlength: COMPANY_NAME_MIN_LENGTH
        })
      ),
    owner_name: z
      .string()
      .trim()
      .min(1, t('fields.owner_name.validation.required'))
      .min(
        OWNER_NAME_MIN_LENGTH,
        t('fields.company_name.validation.minlength', {
          minlength: OWNER_NAME_MIN_LENGTH
        })
      ),
    owner_email: z
      .string()
      .trim()
      .min(1, t('fields.owner_email.validation.required'))
      .email(t('fields.owner_email.validation.invalid')),
  })
}

export type SignUpFormSchemaInput = z.infer<ReturnType<typeof getSignUpFormSchema>>

