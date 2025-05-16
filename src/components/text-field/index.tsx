import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form"

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"

import { Input } from "@/components/ui/input"

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Pick<ControllerProps<TFieldValues, TName>, 'control' | 'disabled' | 'name'> & {
  label: string
  type?: "text" | "email"
}

export function TextField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ control, name, label, type = 'text', disabled }: Props<TFieldValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              disabled={disabled}
              {...field}
            />
          </FormControl>
          <div className="min-h-5">
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )
}
