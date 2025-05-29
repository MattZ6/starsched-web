import { starschedAPI } from "./client";

type Input = {
  companyId: string
  inviteId: string
}

export async function deleteCompanyInvite(input: Input) {
  const { companyId, inviteId } = input

  const { data, error } = await starschedAPI.companyInvites.delete({
    company_id: companyId,
    invite_id: inviteId,
  })

  if (error) {
    throw error
  }

  return data
}
