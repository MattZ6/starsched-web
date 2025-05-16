import { useParams } from "react-router-dom"

import { useGetCompanySignUpRequest } from "@/hooks/services/starsched/use-get-company-sign-up-request"

import { Loading } from "./components/loading"
import { ValidationFailure } from "./components/validation-failure"
import { NotFoundFailure } from "./components/not-found-failure"
import { ExpiredFailure } from "./components/expired-failure"
import { Failure } from "./components/failure"
import { AccountConfirmation } from "./components/account-confirmation"

export default function AccountConfirmationPage() {
  const params = useParams()
  const code = params.id!

  const { isLoading, isFetching, isError, refetch, data } = useGetCompanySignUpRequest({ code })

  const output = data!

  if (isLoading || isFetching) {
    return <Loading />
  }

  if (isError) {
    return <Failure onTryAgain={refetch} />
  }

  if (output.error) {
    if (output.error.code === 'validation') {
      return <ValidationFailure />
    }

    if (output.error.code === 'user.account.creation.request.token.not.exists') {
      return <NotFoundFailure />
    }

    if (output.error.code === 'user.account.creation.request.token.expired') {
      return <ExpiredFailure />
    }

    return <Failure onTryAgain={refetch} />
  }

  return <AccountConfirmation
    code={code}
    companyName={output.data.company_name}
    ownerName={output.data.owner_name}
    ownerEmail={output.data.owner_email}
  />
}
