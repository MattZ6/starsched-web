import { z } from "zod";

type TFunction = (key: string, options?: Record<string, string | number | Date>) => string

export const COMPANY_NAME_MIN_LENGTH = 3

export function getCreateCompanySchema(t: TFunction) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(1, t('fields.name.validation.required'))
      .min(
        COMPANY_NAME_MIN_LENGTH,
        t('fields.name.validation.minlength', {
          minlength: COMPANY_NAME_MIN_LENGTH
        })
      ),
  })
}

export type CreateCompanySchemaInput = z.infer<ReturnType<typeof getCreateCompanySchema>>

