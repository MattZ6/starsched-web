import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export function NavLinks() {
  const { t } = useTranslation('base-layout', { keyPrefix: 'header.nav-links' })

  return (
    <nav className="flex items-center gap-2">
      <Button variant="ghost" size="sm" asChild>
        <Link to="/sign-in">
          {t('sign-in.label')}
        </Link>
      </Button>
      <Button size="sm" asChild>
        <Link to="/sign-up">
          {t('sign-up.label')}
        </Link>
      </Button>
    </nav >
  )
}
