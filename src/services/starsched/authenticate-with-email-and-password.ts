import { starschedAPI } from "./client";

type Input = {
  email: string;
  password: string;
}

export async function authenticateWithEmailAndPassword(input: Input) {
  const { email, password } = input

  const { data, error } = await starschedAPI.authentication.signInWithEmailAndPassword({
    email,
    password
  })

  if (error) {
    throw error
  }

  return data
}
