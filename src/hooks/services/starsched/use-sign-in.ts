import { useAuthentication } from "@/hooks/use-authentication"
import { authenticateWithEmailAndPassword } from "@/services/starsched/authenticate-with-email-and-password"
import { useMutation } from "@tanstack/react-query"

export function useSignIn() {
  const { signIn } = useAuthentication()

  return useMutation({
    mutationFn: authenticateWithEmailAndPassword,
    onSuccess: ({ data }) => {
      if (data) {
        signIn({ accessToken: data.access_token })
      }
    }
  })
}
