import { useGetMyProfile } from "@/hooks/services/starsched/use-get-my-profile";

import { StringUtils } from "@/utils/string";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenu, SidebarMenuButton } from "@/components/ui/sidebar";

const stringUtils = new StringUtils()

export function ProfileLink() {
  const { isLoading, error, data } = useGetMyProfile()

  if (isLoading) {
    return <span>carregando...</span>
  }

  if (error) {
    return <span>falha</span>
  }

  const profile = data!;
  const avatarFallback = stringUtils.getAvatarFallback(profile.name)

  return (
    <SidebarMenu>
      <SidebarMenuButton size="lg" disabled>
        <Avatar>
          <AvatarImage />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>

        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">
            {profile.name}
          </span>
          <span className="truncate text-xs">
            Ver meu perfil
          </span>
        </div>
      </SidebarMenuButton>
    </SidebarMenu>
  )
}
