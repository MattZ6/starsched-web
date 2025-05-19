import { starschedAPI } from "./client";

type Input = {
  id: string;
  abortSignal: AbortSignal
}

export async function getCompanySignUpRequest(input: Input) {
  const { id, abortSignal } = input

  const { data, error } = await starschedAPI.accounts.getCompanySignUpRequest(
    { token: id },
    { abortSignal },
  )

  if (error) {
    throw error
  }

  return data
}
