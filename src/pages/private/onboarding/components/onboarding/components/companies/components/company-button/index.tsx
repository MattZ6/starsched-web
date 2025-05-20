import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import type { Company } from "@starsched/sdk";

import { StringUtils } from "@/utils/string";

type Props = {
  company: Company;
}

const stringUtils = new StringUtils()

export function CompanyButton({ company }: Props) {
  const { t } = useTranslation('common', { keyPrefix: 'company' })
  const navigate = useNavigate()
  const initials = stringUtils.getAvatarFallback(company.name);

  const handleSelect = useCallback(() => {
    navigate(`/${company.slug}`, { replace: true })
  }, [company, navigate])

  return (
    <button
      type="button"
      className="flex gap-4 p-4 rounded-md border border-border text-start bg-background shadow-xs hover:bg-accent hover:text-accent-foreground transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] cursor-pointer"
      onClick={handleSelect}
    >
      <div className="flex items-center justify-center rounded-md border border-border size-10 bg-background">
        {initials}
      </div>

      <div className="flex flex-col">
        <span className="font-semibold text-base">{company.name}</span>
        <div className="flex items-center gap-1">
          <span className="text-sm text-muted-foreground">{t(`role.${company.role}`)}</span>
          {/* <span className="text-xs text-muted-foreground">•</span> */}
          {/* <span className="text-sm text-muted-foreground">3 membros</span> */}
        </div>
      </div>
    </button>
  )
}
