import { useMemo } from "react"

import { useGetMyCompanies } from "@/hooks/services/starsched/use-get-my-companies"

import { Loading } from "./components/loading"
import { Failure } from "./components/failure"
import { Onboarding } from "./components/onboarding"

export default function OnboardingPage() {
  const { isLoading, error, refetch, data } = useGetMyCompanies()

  const companies = useMemo(() => data ?? [], [data]);

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <Failure onTryAgain={refetch} />
  }

  return <Onboarding companies={companies} />
}
