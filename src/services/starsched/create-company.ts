import { starschedAPI } from "./client";

type Input = {
  name: string
}

export async function createCompany(input: Input) {
  const { name } = input

  const { data, error } = await starschedAPI.companies.create({ name })

  if (error) {
    throw error
  }

  return data
}
