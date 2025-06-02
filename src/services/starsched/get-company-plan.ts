import { starschedAPI } from "./client";

export type Input = {
  companyId: string
  abortSignal: AbortSignal
}

export async function getCompanyPlan(input: Input) {
  const { companyId, abortSignal } = input

  const { data, error } = await starschedAPI.companiesPlan.get({
    company_id: companyId,
  }, {
    abortSignal
  })

  if (error) {
    throw error
  }

  return data
}
