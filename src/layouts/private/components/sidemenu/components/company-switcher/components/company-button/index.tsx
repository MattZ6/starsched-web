import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import type { Company } from "@starsched/sdk";

import { selectedCompanySlugAtom } from "@/atoms/selected-company-slug";

import { StringUtils } from "@/utils/string";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

type Props = {
  company: Company
}

const stringUtils = new StringUtils()

export function CompanyButton({ company }: Props) {
  const avatarFallback = stringUtils.getAvatarFallback(company.name);
  const setCompanySlug = useSetAtom(selectedCompanySlugAtom)
  const location = useLocation()
  const navigate = useNavigate()

  const handleSelect = useCallback(() => {
    const [, , ...rest] = location.pathname.split('/')

    const newUrl = [company.slug, ...rest].join('/')
    setCompanySlug(company.slug)
    navigate(`/${newUrl}`)
  }, [company, location.pathname, navigate, setCompanySlug])

  return (
    <DropdownMenuItem className="gap-2 p-2" onClick={handleSelect}>
      <div className="flex items-center justify-center size-8 rounded-sm border bg-background">
        <span className="shrink-0">{avatarFallback}</span>
      </div>
      {company.name}
    </DropdownMenuItem>
  )
}
