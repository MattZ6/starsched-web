import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useSetAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { CircleAlert } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CreateCompany } from "@starsched/sdk";

import { selectedCompanyAtom } from "@/atoms/selected-company";

import { useAlert } from "@/hooks/use-alert";

import { Form } from "@/components/ui/form";
import { TextField } from "@/components/text-field";
import { Button } from "@/components/ui/button";

import { useCreateCompany } from "@/hooks/services/starsched/use-create-company";

import { isStarSchedError } from "@/utils/is-starsched-error";

import { type CreateCompanySchemaInput, getCreateCompanySchema } from "./schema";

export function CreateCompanyForm() {
  const { t } = useTranslation('onboarding', { keyPrefix: 'select-company.page.create-company.form' });
  const { showAlert } = useAlert()
  const { mutateAsync } = useCreateCompany()
  const selectCompany = useSetAtom(selectedCompanyAtom)

  const signUpFormSchema = useMemo(() => getCreateCompanySchema(t), [t])

  const form = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: '',
    }
  })

  const onFormSubmit = useCallback(async (input: CreateCompanySchemaInput) => {
    const { name } = input

    try {
      const output = await mutateAsync({ name })

      selectCompany(output)

      // TODO: Pensar em fazer o redirect ou criar um nav guard pra isso
    } catch (error) {
      if (isStarSchedError<CreateCompany.Failure>(error)) {
        if (error.code === 'validation') {
          const { validation } = error

          form.setError(
            validation.field,
            {
              message: t(
                `fields.${validation.field}.validation.${validation.type}`,
                { [validation.type]: validation?.value ?? '' }
              )
            },
            { shouldFocus: true }
          )

          return;
        }

        showAlert({
          icon: CircleAlert,
          title: t('errors.internal.title'),
          description: t('errors.internal.description'),
          closeButton: {
            text: t('errors.internal.close-button.label')
          }
        })

        return;
      }

      showAlert({
        icon: CircleAlert,
        title: t('errors.exception.title'),
        description: t('errors.exception.description'),
        closeButton: {
          text: t('errors.exception.close-button.label')
        }
      })
    }
  }, [form, mutateAsync, selectCompany, showAlert, t])

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onFormSubmit)}
        className="flex flex-col gap-2"
      >
        <TextField
          control={form.control}
          name="name"
          disabled={form.formState.isSubmitting}
          label={t('fields.name.label')}
        />

        <div className="flex items-center justify-end gap-2">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="self-end"
          >
            {t('actions.submit.label')}
          </Button>
        </div>
      </form>
    </Form>
  )
}
