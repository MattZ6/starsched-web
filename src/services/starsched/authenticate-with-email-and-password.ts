import { starschedAPI } from "./client";

type Input = {
  email: string;
  password: string;
}

export async function authenticateWithEmailAndPassword(input: Input) {
  const { email, password } = input

  return starschedAPI.authentication.signInWithEmailAndPassword({
    email,
    password
  })

}
