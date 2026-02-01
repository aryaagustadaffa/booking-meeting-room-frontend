'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion, HTMLMotionProps } from 'framer-motion'

export interface WideCardProps extends Omit<HTMLMotionProps<'div'>, 'variant'> {
  variant?: 'elevated' | 'flat' | 'outlined'
  hover?: boolean
  hoverLift?: 'none' | 'sm' | 'md' | 'lg'
  children?: React.ReactNode
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const WideCard = React.forwardRef<HTMLDivElement, WideCardProps>(
  ({ 
    className, 
    variant = 'elevated', 
    hover = false, 
    hoverLift = 'none',
    padding = 'md',
    children, 
    ...props 
  }, ref) => {
    const baseStyles = 'rounded-2xl overflow-hidden transition-all duration-200'
    
    const variantStyles = {
      elevated: 'bg-surface shadow-card',
      flat: 'bg-surface-container-low',
      outlined: 'bg-surface border border-subtle',
    }
    
    const hoverStyles = {
      none: '',
      sm: 'hover:shadow-card-md',
      md: 'hover:shadow-card-lg',
      lg: 'hover:shadow-card-lg hover:-translate-y-0.5',
    }
    
    const paddingStyles = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    }
    
    const cursorStyles = hover || hoverLift !== 'none' ? 'cursor-pointer' : ''
    
    return (
      <motion.div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          hoverStyles[hoverLift],
          paddingStyles[padding],
          cursorStyles,
          className
        )}
        whileHover={hover || hoverLift !== 'none' ? { scale: 1.01 } : undefined}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
WideCard.displayName = 'WideCard'

export interface WideCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  action?: React.ReactNode
}

const WideCardHeader = React.forwardRef<HTMLDivElement, WideCardHeaderProps>(
  ({ className, children, action, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-start justify-between gap-4 pb-4', className)}
      {...props}
    >
      <div className="flex-1">{children}</div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  )
)
WideCardHeader.displayName = 'WideCardHeader'

export interface WideCardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode
  subtitle?: string
}

const WideCardTitle = React.forwardRef<HTMLHeadingElement, WideCardTitleProps>(
  ({ className, children, subtitle, ...props }, ref) => (
    <div ref={ref} className="space-y-1" {...props}>
      <h3 className={cn('text-heading-lg font-semibold text-foreground', className)}>
        {children}
      </h3>
      {subtitle && (
        <p className="text-body-sm text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  )
)
WideCardTitle.displayName = 'WideCardTitle'

export interface WideCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const WideCardContent = React.forwardRef<HTMLDivElement, WideCardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('space-y-4', className)} {...props}>
      {children}
    </div>
  )
)
WideCardContent.displayName = 'WideCardContent'

export interface WideCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  align?: 'left' | 'center' | 'right' | 'space-between'
}

const WideCardFooter = React.forwardRef<HTMLDivElement, WideCardFooterProps>(
  ({ className, children, align = 'right', ...props }, ref) => {
    const alignStyles = {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
      'space-between': 'justify-between',
    }
    
    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-3 pt-4 border-t border-subtle', alignStyles[align], className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
WideCardFooter.displayName = 'WideCardFooter'

export interface WideCardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  cols?: 1 | 2 | 3 | 4 | 6 | 12
  gap?: 'sm' | 'md' | 'lg'
}

export function WideCardGrid({ 
  children, 
  cols = 3, 
  gap = 'md',
  className 
}: WideCardGridProps) {
  const colsStyles = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    6: 'grid-cols-6',
    12: 'grid-cols-12',
  }
  
  const gapStyles = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  }
  
  return (
    <div className={cn('grid', colsStyles[cols], gapStyles[gap], className)}>
      {children}
    </div>
  )
}

export interface WideCardStatProps {
  label: string
  value: string | number
  icon?: React.ReactNode
  trend?: {
    value: string
    positive?: boolean
  }
  className?: string
}

export function WideCardStat({ label, value, icon, trend, className }: WideCardStatProps) {
  return (
    <div className={cn('flex items-start gap-3', className)}>
      {icon && (
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-body-xs text-muted-foreground uppercase tracking-wider">
          {label}
        </p>
        <p className="text-heading-2xl font-semibold text-foreground mt-1">
          {value}
        </p>
        {trend && (
          <p className={cn(
            'text-body-xs font-medium mt-1',
            trend.positive ? 'text-primary' : 'text-destructive'
          )}>
            {trend.value}
          </p>
        )}
      </div>
    </div>
  )
}

export {
  WideCard,
  WideCardHeader,
  WideCardTitle,
  WideCardContent,
  WideCardFooter,
}
