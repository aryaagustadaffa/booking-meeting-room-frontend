'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

export interface MaterialInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  onRightIconClick?: () => void
  fullWidth?: boolean
}

const MaterialInput = React.forwardRef<HTMLInputElement, MaterialInputProps>(
  ({ 
    className, 
    type = 'text',
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    onRightIconClick,
    fullWidth = true,
    id,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(false)
    const generatedId = React.useId()
    
    const inputId = id || `input-${generatedId}`
    
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
    
    return (
      <div className={cn('relative', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'absolute left-3 top-3 text-body-sm transition-all duration-200 pointer-events-none',
              'bg-background px-1',
              (isFocused || hasValue) && '-top-2 left-2 text-body-xs text-primary',
              error && 'text-destructive',
              !isFocused && !hasValue && !error && 'text-muted-foreground'
            )}
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            type={type}
            className={cn(
              'w-full px-3 py-3 text-body-sm bg-transparent',
              'border-b-2 transition-all duration-200',
              'placeholder:text-transparent',
              'focus:outline-none',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error
                ? 'border-destructive focus:border-destructive'
                : isFocused
                ? 'border-primary focus:border-primary'
                : 'border-subtle focus:border-primary',
              className
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...props}
          />
          
          {rightIcon && (
            <button
              type="button"
              onClick={onRightIconClick}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear input"
            >
              {rightIcon}
            </button>
          )}
        </div>
        
        {(error || helperText) && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 flex items-center gap-1"
          >
            {error && (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-destructive flex-shrink-0"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            )}
            <p className={cn(
              'text-body-xs',
              error ? 'text-destructive' : 'text-muted-foreground'
            )}>
              {error || helperText}
            </p>
          </motion.div>
        )}
      </div>
    )
  }
)
MaterialInput.displayName = 'MaterialInput'

export interface MaterialTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  fullWidth?: boolean
  rows?: number
}

const MaterialTextarea = React.forwardRef<HTMLTextAreaElement, MaterialTextareaProps>(
  ({ 
    className, 
    label,
    error,
    helperText,
    fullWidth = true,
    rows = 4,
    id,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(false)
    const generatedId = React.useId()
    
    const textareaId = id || `textarea-${generatedId}`
    
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
    
    return (
      <div className={cn('relative', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              'absolute left-3 top-3 text-body-sm transition-all duration-200 pointer-events-none',
              'bg-background px-1',
              (isFocused || hasValue) && '-top-2 left-2 text-body-xs text-primary',
              error && 'text-destructive',
              !isFocused && !hasValue && !error && 'text-muted-foreground'
            )}
          >
            {label}
          </label>
        )}
        
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            'w-full px-3 py-3 text-body-sm bg-transparent resize-none',
            'border-b-2 transition-all duration-200',
            'placeholder:text-transparent',
            'focus:outline-none',
            error
              ? 'border-destructive focus:border-destructive'
              : isFocused
              ? 'border-primary focus:border-primary'
              : 'border-subtle focus:border-primary',
            className
          )}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />
        
        {(error || helperText) && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 flex items-center gap-1"
          >
            {error && (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-destructive flex-shrink-0"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            )}
            <p className={cn(
              'text-body-xs',
              error ? 'text-destructive' : 'text-muted-foreground'
            )}>
              {error || helperText}
            </p>
          </motion.div>
        )}
      </div>
    )
  }
)
MaterialTextarea.displayName = 'MaterialTextarea'

export { MaterialInput, MaterialTextarea }
