import { z } from "zod";

type TFunction = (key: string, options?: Record<string, string | number | Date>) => string

export function getUpdateInviteRoleSchema(t: TFunction) {
  return z.object({
    role: z.enum(
      ['collaborator', 'manager'],
      {
        message: t('fields.role.validation.invalid'),
        required_error: t('fields.role.validation.required'),
      })
  })
}

export type UpdateInviteRoleSchemaInput = z.infer<ReturnType<typeof getUpdateInviteRoleSchema>>

