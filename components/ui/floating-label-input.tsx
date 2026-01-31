'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export interface FloatingLabelInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ className, type, label, error, id, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(false)

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      props.onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      props.onBlur?.(e)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0)
      props.onChange?.(e)
    }

    const inputId = id || label.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className={cn('relative', className)}>
        <Input
          id={inputId}
          type={type}
          ref={ref}
          className={cn(
            'peer h-12 pt-4',
            error && 'border-destructive focus-visible:ring-destructive'
          )}
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <Label
          htmlFor={inputId}
          className={cn(
            'absolute left-3 top-1/2 -translate-y-1/2 origin-left bg-background px-1 text-sm text-muted-foreground transition-all duration-200 peer-focus:-translate-y-5 peer-focus:text-xs peer-focus:text-foreground peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:text-xs',
            (isFocused || hasValue) && '-translate-y-5 text-xs text-foreground',
            error && 'text-destructive'
          )}
        >
          {label}
        </Label>
        {error && (
          <p className="mt-1 text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)
FloatingLabelInput.displayName = 'FloatingLabelInput'

export { FloatingLabelInput }
