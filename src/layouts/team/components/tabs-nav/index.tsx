import { NavLink } from "react-router-dom";

import { useSelectedCompany } from "@/hooks/use-selected-company";

export function TabsNav() {
  const selectedCompany = useSelectedCompany()
  const companySlug = selectedCompany!.slug

  const canViewInvites = selectedCompany?.role === 'owner' || selectedCompany?.role === 'manager'

  return (
    <div className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground w-fit">
      <NavLink
        to={`/${companySlug}/team`}
        end
        aria-current="page"
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-[current=page]:bg-background aria-[current=page]:text-foreground aria-[current=page]:shadow"
      >
        Membros
      </NavLink>

      {canViewInvites && (
        <NavLink
          to={`/${companySlug}/team/invites`}
          end
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-[current=page]:bg-background aria-[current=page]:text-foreground aria-[current=page]:shadow"
        >
          Convites
        </NavLink>
      )}
    </div>
  )
}
