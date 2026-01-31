'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { motion, HTMLMotionProps } from 'framer-motion'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-label-medium font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden',
  {
    variants: {
      variant: {
        filled: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
        filledTonal: 'bg-secondary-container text-secondary-container-foreground shadow-sm hover:bg-secondary-container/90',
        outlined: 'border border-outline bg-transparent text-foreground hover:bg-surface-container-low',
        text: 'bg-transparent text-primary hover:bg-primary/10',
        elevated: 'bg-primary text-primary-foreground elevation-1 hover:elevation-3',
        tonal: 'bg-secondary-container text-secondary-container-foreground hover:bg-secondary-container/80',
      },
      size: {
        sm: 'h-8 px-3 text-label-small',
        default: 'h-10 px-4 text-label-medium',
        lg: 'h-12 px-6 text-label-large',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'filled',
      size: 'default',
    },
  }
)

// Create a base type that excludes conflicting animation props from HTMLMotionProps
type MotionButtonProps = Omit<HTMLMotionProps<'button'>, 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' | 'children'>

export interface MButtonProps
  extends MotionButtonProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof MotionButtonProps>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  ripple?: boolean
  children?: React.ReactNode
}

const MButton = React.forwardRef<HTMLButtonElement, MButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, ripple = true, disabled, children, ...props }, ref) => {
    // Motion-specific props that should only be passed to motion.button
    const {
      whileTap,
      whileHover,
      whileFocus,
      whileInView,
      whileDrag,
      drag,
      dragConstraints,
      dragElastic,
      dragMomentum,
      dragPropagation,
      dragTransition,
      dragControls,
      onDrag,
      onDragStart,
      onDragEnd,
      onDirectionLock,
      onMeasureDragConstraints,
      transition,
      initial,
      animate,
      exit,
      variants,
      style,
      layout,
      layoutId,
      onAnimationComplete,
      onUpdate,
      ...htmlProps
    } = props
    
    const motionProps = {
      whileTap,
      whileHover,
      whileFocus,
      whileInView,
      whileDrag,
      drag,
      dragConstraints,
      dragElastic,
      dragMomentum,
      dragPropagation,
      dragTransition,
      dragControls,
      onDrag,
      onDragStart,
      onDragEnd,
      onDirectionLock,
      onMeasureDragConstraints,
      transition,
      initial,
      animate,
      exit,
      variants,
      style,
      layout,
      layoutId,
      onAnimationComplete,
      onUpdate,
    }
    
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }), ripple && 'ripple')}
          ref={ref as React.RefObject<HTMLElement>}
          {...htmlProps}
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {children}
        </Slot>
      )
    }
    
    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }), ripple && 'ripple')}
        ref={ref}
        disabled={disabled || loading}
        {...motionProps}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </motion.button>
    )
  }
)
MButton.displayName = 'MButton'

export { MButton, buttonVariants }
