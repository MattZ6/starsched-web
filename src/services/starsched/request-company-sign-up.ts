import { starschedAPI } from "./client";

type Input = {
  company: { name: string }
  owner: { name: string; email: string; }
}

export async function requestCompanySignUp(input: Input) {
  const { owner, company } = input

  const { data, error } = await starschedAPI.accounts.requestCompanySignUp({
    owner_name: owner.name,
    owner_email: owner.email,
    company_name: company.name
  })

  if (error) {
    throw error
  }

  return data
}
