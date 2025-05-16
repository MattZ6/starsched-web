import { starschedAPI } from "./client";

type Input = {
  abortSignal: AbortSignal
}

export async function getMyProfile(input: Input) {
  const { abortSignal } = input

  return starschedAPI.profiles.getMyProfile({ abortSignal })
}
