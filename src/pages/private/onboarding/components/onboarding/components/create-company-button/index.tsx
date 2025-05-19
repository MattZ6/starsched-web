import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

import { CreateCompanyForm } from "./components/create-company-form";

export function CreateCompanyButton() {
  const { t } = useTranslation('onboarding', { keyPrefix: 'select-company.page.create-company' })

  return (
    <Dialog>
      {/*    dark:bg-input/30 dark:border-input dark:hover:bg-input/50 */}
      <DialogTrigger type="button" className="flex items-center gap-4 p-4 rounded-md border border-border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] cursor-pointer">
        <div className="flex items-center justify-center rounded-md border border-border size-10 bg-background">
          <Plus className="size-4" />
        </div>

        <div>
          <span>{t('button.label')}</span>
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('modal.title')}</DialogTitle>
          <DialogDescription>{t('modal.description')}</DialogDescription>
        </DialogHeader>

        <CreateCompanyForm />
      </DialogContent>
    </Dialog>
  )
}
