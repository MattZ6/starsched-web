import { z } from "zod";

type TFunction = (key: string, options?: Record<string, string | number | Date>) => string

export function getInviteUserSchema(t: TFunction) {
  return z.object({
    email: z
      .string()
      .trim()
      .min(1, t('fields.email.validation.required'))
      .email(t('fields.email.validation.invalid')),
    role: z.enum(
      ['collaborator', 'manager'],
      {
        message: t('fields.role.validation.invalid'),
        required_error: t('fields.role.validation.required'),
      })
  })
}

export type InviteUserSchemaInput = z.infer<ReturnType<typeof getInviteUserSchema>>

