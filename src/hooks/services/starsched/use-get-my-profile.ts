import { getMyProfile } from "@/services/starsched/get-my-profile"
import { useQuery } from "@tanstack/react-query"

export function useGetMyProfile() {
  return useQuery({
    queryKey: ['my-profile'],
    staleTime: 1 * 24 * 60 * 60 * 1000, // 👈 1 dia
    queryFn: ({ signal }) => getMyProfile({ abortSignal: signal })
  })
}
