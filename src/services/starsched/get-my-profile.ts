import { starschedAPI } from "./client";

type Input = {
  abortSignal: AbortSignal
}

export async function getMyProfile(input: Input) {
  const { abortSignal } = input

  const { data, error } = await starschedAPI.profiles.getMyProfile({ abortSignal })

  if (error) {
    throw error
  }

  return data
}
