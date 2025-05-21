import type { ListCompanyMembers } from "@starsched/sdk";

import { starschedAPI } from "./client";

export type Input = {
  companyId: string
  limit: number
  offset: number
  sortBy?: ListCompanyMembers.Input['sort_by']
  orderBy?: ListCompanyMembers.Input['order_by']
  abortSignal: AbortSignal
}

export async function getCompanyMembers(input: Input) {
  const { companyId, limit, offset, sortBy, orderBy, abortSignal } = input

  const { data, error } = await starschedAPI.companyMembers.list({
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
