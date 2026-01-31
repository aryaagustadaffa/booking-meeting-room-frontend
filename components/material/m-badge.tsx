'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { motion, type HTMLMotionProps } from 'framer-motion'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-label-small font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-primary/10 text-primary',
        secondary: 'bg-secondary-container text-secondary-container-foreground',
        tertiary: 'bg-tertiary-container text-tertiary-container-foreground',
        success: 'bg-success/10 text-success',
        warning: 'bg-warning/10 text-warning',
        error: 'bg-destructive/10 text-destructive',
        outline: 'border border-outline text-foreground',
        surface: 'bg-surface-container-high text-on-surface',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        default: 'px-2.5 py-0.5 text-label-small',
        lg: 'px-3 py-1 text-label-medium',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

export interface MBadgeProps
  extends Omit<HTMLMotionProps<'div'>, 'ref' | 'children'>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode
  dot?: boolean
  children?: React.ReactNode
}

const MBadge = React.forwardRef<HTMLDivElement, MBadgeProps>(
  ({ className, variant, size, icon, dot = false, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {dot && (
          <span className="h-2 w-2 rounded-full bg-current" />
        )}
        {icon && (
          <span className="h-3.5 w-3.5">{icon}</span>
        )}
        {children}
      </motion.div>
    )
  }
)
MBadge.displayName = 'MBadge'

export { MBadge, badgeVariants }
