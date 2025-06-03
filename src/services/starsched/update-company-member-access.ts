import type { UpdateCompanyMemberAccess } from "@starsched/sdk";

import { starschedAPI } from "./client";

type Input = {
  companyId: string
  memberId: string
  access: UpdateCompanyMemberAccess.Input['access']
}

export async function updateCompanyMemberAccess(input: Input) {
  const { companyId, memberId, access } = input

  const { data, error } = await starschedAPI.companyMembers.updateAccess({
    company_id: companyId,
    member_id: memberId,
    access,
  })

  if (error) {
    throw error
  }

  return data
}
