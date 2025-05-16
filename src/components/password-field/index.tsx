import { useCallback, useState } from "react"
import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form"
import { Eye, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Pick<ControllerProps<TFieldValues, TName>, 'control' | 'disabled' | 'name'> & {
  label: string;
  showPasswordLabel: string;
  hidePasswordLabel: string;
}

export function PasswordField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ control, name, label, disabled, hidePasswordLabel, showPasswordLabel }: Props<TFieldValues, TName>) {
  const [showPassword, setShowPassword] = useState(false)

  const handleTogglePassword = useCallback(() => setShowPassword(mustShow => !mustShow), [])

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="flex items-center relative">
            <FormControl>
              <Input
                type={!disabled && showPassword ? 'text' : 'password'}
                className={cn("pr-[42px]")}
                disabled={disabled}
                {...field}
              />
            </FormControl>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  aria-hidden
                  className="size-6 absolute right-1.5"
                  tabIndex={-1}
                  disabled={disabled}
                  onClick={handleTogglePassword}
                >
                  {!disabled && showPassword ? <Eye /> : <EyeOff />}
                </Button>
              </TooltipTrigger>

              <TooltipContent>
                {!disabled && showPassword ? hidePasswordLabel : showPasswordLabel}
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="min-h-5">
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )
}
