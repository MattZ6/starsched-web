import { useMutation, useQueryClient } from "@tanstack/react-query"

import { createCompany } from "@/services/starsched/create-company"

export function useCreateCompany() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCompany,
    onSuccess: () => queryClient.refetchQueries({ queryKey: ['my-companies'] })
  })
}
