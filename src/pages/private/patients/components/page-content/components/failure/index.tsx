import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { AlertCircle, Ban, Bug, SearchX, ServerOff, } from "lucide-react"
import type { ListCompanyPatients } from "@starsched/sdk"

import { isStarSchedError } from "@/utils/is-starsched-error"

import { useAuthentication } from "@/hooks/use-authentication"

import { ErrorTemplate } from "./components/error-template"

type Props = {
  error: Error
  onTryAgain: () => void
}

export function Failure({ error, onTryAgain }: Props) {
  const { t } = useTranslation('patients', { keyPrefix: 'patients.page.failure' })
  const { signOut } = useAuthentication()
  const navigate = useNavigate()

  function handleBackHome() {
    navigate('/', { replace: true })
  }

  if (isStarSchedError<ListCompanyPatients.Failure>(error)) {
    if (error.code === 'validation') {
      return <ErrorTemplate
        icon={SearchX}
        title={t('validation.title')}
        description={t('validation.description')}
        buttonText={t('validation.back.button.label')}
        onAction={handleBackHome}
      />
    }

    if (error.code === 'token.expired' || error.code === 'token.invalid' || error.code === 'token.not.provided' || error.code === 'user.not.exists') {
      signOut()
      return null;
    }

    if (error.code === 'company.not.exists') {
      return <ErrorTemplate
        icon={ServerOff}
        title={t('company-not-exists.title')}
        description={t('company-not-exists.description')}
        buttonText={t('company-not-exists.back.button.label')}
        onAction={handleBackHome}
      />
    }

    if (error.code === 'access.denied') {
      return <ErrorTemplate
        icon={Ban}
        title={t('access-denied.title')}
        description={t('access-denied.description')}
        buttonText={t('access-denied.back.button.label')}
        onAction={handleBackHome}
      />
    }

    return <ErrorTemplate
      icon={AlertCircle}
      title={t('internal.title')}
      description={t('internal.description')}
      buttonText={t('internal.try-again.button.label')}
      onAction={onTryAgain}
    />
  }

  return <ErrorTemplate
    icon={Bug}
    title={t('exception.title')}
    description={t('exception.description')}
    buttonText={t('exception.try-again.button.label')}
    onAction={onTryAgain}
  />
}
