import { useTranslation } from "react-i18next"
import { CircleUserRound, Settings } from "lucide-react"

import { StringUtils } from "@/utils/string"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { LogoutButton } from "./components/logout-button"
import { useGetMyProfile } from "@/hooks/services/starsched/use-get-my-profile"
import { Skeleton } from "@/components/ui/skeleton"

const stringUtils = new StringUtils()

export function ProfileMenu() {
  const { t } = useTranslation('base-layout', { keyPrefix: 'header.profile-menu' })
  const { isLoading, error, data } = useGetMyProfile()

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 rounded-md p-2">
        <Skeleton className="size-8 shrink-0 rounded-full" />

        <div className="grid flex-1 text-left text-sm leading-tight max-w-40">
          <Skeleton className="w-[120px] h-6" />
        </div>
      </div>
    )
  }

  if (error) {
    // TODO: Pensar no que fazer no caso de falha
    return <span>Falha</span>
  }

  const profile = data!;

  const name = stringUtils.contractName(profile.name)
  const avatarFallback = stringUtils.extractFirstLetter(profile.name)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center gap-2 rounded-md p-2 bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer"
      >
        <Avatar>
          <AvatarImage />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>

        <div className="grid flex-1 text-left text-sm leading-tight max-w-40">
          <span className="truncate font-semibold">
            {name}
          </span>
          <span className="truncate text-xs text-muted-foreground">
            {profile.email}
          </span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem disabled>
          <CircleUserRound className="size-4" />
          {t('my-profile.label')}
        </DropdownMenuItem>

        <DropdownMenuItem disabled>
          <Settings className="size-4" />
          {t('settings.label')}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
