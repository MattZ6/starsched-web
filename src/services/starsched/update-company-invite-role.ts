import type { UpdateCompanyInviteRole } from "@starsched/sdk";

import { starschedAPI } from "./client";

type Input = {
  companyId: string
  inviteId: string
  role: UpdateCompanyInviteRole.Input['role']
}

export async function updateCompanyInviteRole(input: Input) {
  const { companyId, inviteId, role } = input

  const { data, error } = await starschedAPI.companyInvites.updateRole({
    company_id: companyId,
    invite_id: inviteId,
    role,
  })

  if (error) {
    throw error
  }

  return data
}
