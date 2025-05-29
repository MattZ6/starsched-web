import { starschedAPI } from "./client";

type Input = {
  companyId: string
  inviteId: string
}

export async function resendCompanyInvite(input: Input) {
  const { companyId, inviteId } = input

  const { data, error } = await starschedAPI.companyInvites.resend({
    company_id: companyId,
    invite_id: inviteId,
  })

  if (error) {
    throw error
  }

  return data
}
