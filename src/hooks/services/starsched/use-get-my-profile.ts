import { getMyProfile } from "@/services/starsched/get-my-profile"
import { useQuery } from "@tanstack/react-query"

export function useGetMyProfile() {
  return useQuery({
    queryKey: ['my-profile'],
    refetchOnWindowFocus: false,
    queryFn: ({ signal }) => getMyProfile({ abortSignal: signal })
  })
}
