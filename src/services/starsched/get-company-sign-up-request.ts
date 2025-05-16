import { starschedAPI } from "./client";

type Input = {
  id: string;
  abortSignal: AbortSignal
}

export async function getCompanySignUpRequest(input: Input) {
  const { id, abortSignal } = input

  return starschedAPI.accounts.getCompanySignUpRequest(
    { token: id },
    { abortSignal },
  )
}
