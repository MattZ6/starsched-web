import { starschedAPI } from "./client";

type Input = {
  abortSignal: AbortSignal
}

export async function getMyCompanies(input: Input) {
  const { abortSignal } = input

  const { data, error } = await starschedAPI.companies.getMyCompanies({ abortSignal })

  if (error) {
    throw error
  }

  return data
}
