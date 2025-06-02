import type { UpdateCompanyMemberRole } from "@starsched/sdk";

import { starschedAPI } from "./client";

type Input = {
  companyId: string
  memberId: string
  role: UpdateCompanyMemberRole.Input['role']
}

export async function updateCompanyMemberRole(input: Input) {
  const { companyId, memberId, role } = input

  const { data, error } = await starschedAPI.companyMembers.updateRole({
    company_id: companyId,
    member_id: memberId,
    role,
  })

  if (error) {
    throw error
  }

  return data
}
