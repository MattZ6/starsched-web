import { app } from "@/constants/app"

import { useAuthentication } from "@/hooks/use-authentication"

import { NavLinks } from "./components/nav-links";
import { ProfileMenu } from "./components/profile-menu";

export function Header() {
  const { user } = useAuthentication()
  const isAuthenticated = !!user;

  return (
    <header className="border-b border-base-6 sticky top-0 bg-background">
      <div className="flex flex-row gap-4 items-center px-6 max-w-7xl mx-auto min-h-16">
        <div className="flex items-center gap-1">
          <span className="font-bold text-xl text-foreground">
            {app.name}
          </span>

          {app.isBeta && (
            <span className="self-start font-medium text-xs py-0.5 px-2 rounded-full ml-1 text-primary-foreground bg-primary select-none">
              beta
            </span>
          )}
        </div>

        <div className="ml-auto ">
          {isAuthenticated ? <ProfileMenu /> : <NavLinks />}
        </div>
      </div >
    </header >
  )
}
