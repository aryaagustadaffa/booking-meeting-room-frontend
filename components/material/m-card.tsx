'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion, HTMLMotionProps } from 'framer-motion'

export interface MCardProps extends Omit<HTMLMotionProps<'div'>, 'variant'> {
  variant?: 'elevated' | 'filled' | 'outlined'
  elevation?: 1 | 2 | 3 | 4 | 5
  hover?: boolean
  children?: React.ReactNode
}

const MCard = React.forwardRef<HTMLDivElement, MCardProps>(
  ({ className, variant = 'elevated', elevation = 1, hover = false, children, ...props }, ref) => {
    const baseStyles = 'rounded-xl overflow-hidden transition-all duration-200'
    
    const variantStyles = {
      elevated: 'bg-card',
      filled: 'bg-surface-container',
      outlined: 'bg-card border border-outline',
    }
    
    const elevationStyles = {
      1: 'elevation-1',
      2: 'elevation-2',
      3: 'elevation-3',
      4: 'elevation-4',
      5: 'elevation-5',
    }
    
    const hoverStyles = hover
      ? 'hover:scale-[1.02] hover:shadow-lg cursor-pointer'
      : ''
    
    return (
      <motion.div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          variant !== 'outlined' && elevationStyles[elevation],
          hoverStyles,
          className
        )}
        whileHover={hover ? { scale: 1.02 } : undefined}
        transition={{ duration: 0.2 }}
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
      className={cn('text-title-large font-semibold leading-none tracking-tight', className)}
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
      className={cn('text-body-medium text-muted-foreground', className)}
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
