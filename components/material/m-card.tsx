'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion, HTMLMotionProps } from 'framer-motion'

export interface MCardProps extends Omit<HTMLMotionProps<'div'>, 'variant'> {
  variant?: 'elevated' | 'filled' | 'outlined'
  elevation?: 'sm' | 'md' | 'lg'
  hover?: boolean
  hoverLift?: 'none' | 'sm' | 'md' | 'lg'
  children?: React.ReactNode
}

const MCard = React.forwardRef<HTMLDivElement, MCardProps>(
  ({ className, variant = 'elevated', elevation = 'md', hover = false, hoverLift = 'none', children, ...props }, ref) => {
    const baseStyles = 'rounded-2xl overflow-hidden transition-all duration-200'
    
    const variantStyles = {
      elevated: 'bg-surface shadow-card',
      filled: 'bg-surface-container-low',
      outlined: 'bg-surface border border-subtle',
    }
    
    const elevationStyles = {
      sm: 'shadow-card-sm',
      md: 'shadow-card',
      lg: 'shadow-card-md',
    }
    
    const hoverStyles = {
      none: '',
      sm: 'hover:shadow-card-md',
      md: 'hover:shadow-card-lg',
      lg: 'hover:shadow-card-lg hover:-translate-y-0.5',
    }
    
    const cursorStyles = hover || hoverLift !== 'none' ? 'cursor-pointer' : ''
    
    return (
      <motion.div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          variant === 'elevated' && elevationStyles[elevation],
          hoverStyles[hoverLift],
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
MCard.displayName = 'MCard'

export interface MCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const MCardHeader = React.forwardRef<HTMLDivElement, MCardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    >
      {children}
    </div>
  )
)
MCardHeader.displayName = 'MCardHeader'

export interface MCardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode
}

const MCardTitle = React.forwardRef<HTMLHeadingElement, MCardTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-heading-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    >
      {children}
    </h3>
  )
)
MCardTitle.displayName = 'MCardTitle'

export interface MCardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode
}

const MCardDescription = React.forwardRef<HTMLParagraphElement, MCardDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-body-sm text-muted-foreground', className)}
      {...props}
    >
      {children}
    </p>
  )
)
MCardDescription.displayName = 'MCardDescription'

export interface MCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const MCardContent = React.forwardRef<HTMLDivElement, MCardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  )
)
MCardContent.displayName = 'MCardContent'

export interface MCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const MCardFooter = React.forwardRef<HTMLDivElement, MCardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    >
      {children}
    </div>
  )
)
MCardFooter.displayName = 'MCardFooter'

export { MCard, MCardHeader, MCardTitle, MCardDescription, MCardContent, MCardFooter }
