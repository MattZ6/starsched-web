import { starschedAPI } from "./client";

type Input = {
  token: string
  owner: {
    name: string;
    password: string;
    passwordConfirmation: string;
  }
}

export async function finalizeCompanySignUpRequest(input: Input) {
  const { token, owner } = input

  const { data, error } = await starschedAPI.accounts.finalizeCompanySignUpRequest(
    {
      token,
      owner_name: owner.name,
      password: owner.password,
      password_confirmation: owner.passwordConfirmation
    }
  )

  if (error) {
    throw error
  }

  return data
}
