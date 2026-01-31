'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export interface FloatingLabelTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

const FloatingLabelTextarea = React.forwardRef<
  HTMLTextAreaElement,
  FloatingLabelTextareaProps
>(({ className, label, error, id, ...props }, ref) => {
  const [isFocused, setIsFocused] = React.useState(false)
  const [hasValue, setHasValue] = React.useState(false)

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true)
    props.onFocus?.(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false)
    props.onBlur?.(e)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHasValue(e.target.value.length > 0)
    props.onChange?.(e)
  }

  const textareaId = id || label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={cn('relative', className)}>
      <Textarea
        id={textareaId}
        ref={ref}
        className={cn(
          'min-h-[120px] pt-4',
          error && 'border-destructive focus-visible:ring-destructive'
        )}
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <Label
        htmlFor={textareaId}
        className={cn(
          'absolute left-3 top-4 origin-left bg-background px-1 text-sm text-muted-foreground transition-all duration-200 peer-focus:-translate-y-6 peer-focus:text-xs peer-focus:text-foreground peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:text-xs',
          (isFocused || hasValue) && '-translate-y-6 text-xs text-foreground',
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
})
FloatingLabelTextarea.displayName = 'FloatingLabelTextarea'

export { FloatingLabelTextarea }
