import type { CreateCompanyInvite } from "@starsched/sdk";

import { starschedAPI } from "./client";

type Input = {
  companyId: string
  email: string
  role: CreateCompanyInvite.Input['role']
}

export async function createCompanyInvite(input: Input) {
  const { companyId, email, role } = input

  const { data, error } = await starschedAPI.companyInvites.create({
    company_id: companyId,
    email,
    role,
  })

  if (error) {
    throw error
  }

  return data
}
