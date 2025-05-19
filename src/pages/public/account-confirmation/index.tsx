import { useParams } from "react-router-dom"

import { useGetCompanySignUpRequest } from "@/hooks/services/starsched/use-get-company-sign-up-request"

import { isStarSchedError } from "@/utils/is-starsched-error"

import { Loading } from "./components/loading"
import { ValidationFailure } from "./components/validation-failure"
import { NotFoundFailure } from "./components/not-found-failure"
import { ExpiredFailure } from "./components/expired-failure"
import { Failure } from "./components/failure"
import { AccountConfirmation } from "./components/account-confirmation"

export default function AccountConfirmationPage() {
  const params = useParams()
  const code = params.id!

  const { isLoading, isFetching, error, refetch, data } = useGetCompanySignUpRequest({ code })
  const accountCompanySignUpData = data!;

  if (isLoading || isFetching) {
    return <Loading />
  }

  if (error) {
    if (isStarSchedError(error)) {
      if (error.code === 'validation') {
        return <ValidationFailure />
      }

      if (error.code === 'user.account.creation.request.token.not.exists') {
        return <NotFoundFailure />
      }

      if (error.code === 'user.account.creation.request.token.expired') {
        return <ExpiredFailure />
      }

      return <Failure onTryAgain={refetch} />
    }
  }


  return <AccountConfirmation
    code={code}
    companyName={accountCompanySignUpData.company_name}
    ownerName={accountCompanySignUpData.owner_name}
    ownerEmail={accountCompanySignUpData.owner_email}
  />
}
