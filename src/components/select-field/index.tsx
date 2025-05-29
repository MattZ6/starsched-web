import type { ReactNode } from "react";
import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Pick<ControllerProps<TFieldValues, TName>, 'control' | 'disabled' | 'name'> & {
  label: string
  placeholder?: string
  children: ReactNode | Iterable<ReactNode>
  className?: string
}

export function SelectField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ control, name, label, placeholder, disabled, children,className }: Props<TFieldValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={disabled}
          >
            <FormControl className="w-full">
              <SelectTrigger ref={field.ref}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {children}
            </SelectContent>
          </Select>
          <div className="min-h-5">
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )
}

