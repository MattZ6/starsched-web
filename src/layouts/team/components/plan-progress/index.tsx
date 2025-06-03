import { useEffect } from "react";

import { companyPlanEventNames } from "@/constants/company-plan";

import { EventUtils } from "@/utils/event";

import { useSelectedCompany } from "@/hooks/use-selected-company";
import { useGetCompanyPlan } from "@/hooks/services/starsched/use-get-company-plan";

import { Loading } from "./components/loading";
import { Failure } from "./components/failure";
import { Plan } from "./components/plan";

const eventUtils = new EventUtils()

export function PlanProgress() {
  const selectedCompany = useSelectedCompany()
  const canView = selectedCompany?.role === 'owner' || selectedCompany?.role === 'manager'

  if (!selectedCompany || !canView) {
    return null
  }

  return <PlanInfo companyId={selectedCompany.id} />
}

type Props = {
  companyId: string
}

function PlanInfo({ companyId }: Props) {
  const { isLoading, error, refetch, data } = useGetCompanyPlan({ companyId })

  useEffect(() => {
    function reloadPlanInfo() {
      refetch()
    }

    eventUtils.subscribe(companyPlanEventNames.MEMBERS_COUNT_UPDATED, reloadPlanInfo)
    eventUtils.subscribe(companyPlanEventNames.INVITES_COUNT_UPDATED, reloadPlanInfo)

    return () => {
      eventUtils.unsubscribe(companyPlanEventNames.MEMBERS_COUNT_UPDATED, reloadPlanInfo)
      eventUtils.unsubscribe(companyPlanEventNames.INVITES_COUNT_UPDATED, reloadPlanInfo)
    }
  }, [refetch])

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <Failure error={error} onTryAgain={refetch} />
  }

  const companyPlan = data!

  return <Plan plan={companyPlan} />
}
