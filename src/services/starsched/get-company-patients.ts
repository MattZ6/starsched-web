import type { ListCompanyPatients } from "@starsched/sdk";

import { starschedAPI } from "./client";

export type Input = {
  companyId: string
  limit: number
  offset: number
  sortBy?: ListCompanyPatients.Input['sort_by']
  orderBy?: ListCompanyPatients.Input['order_by']
  abortSignal: AbortSignal
}

export async function getCompanyPatients(input: Input) {
  const { companyId, limit, offset, sortBy, orderBy, abortSignal } = input

  const { data, error } = await starschedAPI.companyPatients.list({
    company_id: companyId,
    limit,
    offset,
    order_by: orderBy,
    sort_by: sortBy,
  }, {
    abortSignal
  })

  if (error) {
    throw error
  }

  return data
}
