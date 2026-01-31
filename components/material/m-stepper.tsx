'use client'

import * as React from 'react'
import { Check, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

export interface Step {
  id: string
  label: string
  description?: string
  icon?: React.ReactNode
}

export interface MStepperProps {
  steps: Step[]
  currentStep: number
  onStepClick?: (stepIndex: number) => void
  orientation?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const MStepper = ({
  steps,
  currentStep,
  onStepClick,
  orientation = 'horizontal',
  size = 'md',
  className,
}: MStepperProps) => {
  const isHorizontal = orientation === 'horizontal'
  
  const sizeStyles = {
    sm: {
      stepSize: 'h-6 w-6',
      iconSize: 'h-3 w-3',
      textSize: 'text-label-small',
      connectorHeight: 'h-0.5',
    },
    md: {
      stepSize: 'h-8 w-8',
      iconSize: 'h-4 w-4',
      textSize: 'text-label-medium',
      connectorHeight: 'h-1',
    },
    lg: {
      stepSize: 'h-10 w-10',
      iconSize: 'h-5 w-5',
      textSize: 'text-label-large',
      connectorHeight: 'h-1.5',
    },
  }
  
  const styles = sizeStyles[size]
  
  return (
    <div
      className={cn(
        'flex gap-4',
        isHorizontal ? 'flex-row' : 'flex-col',
        className
      )}
    >
      {steps.map((step, index) => {
        const isCompleted = index < currentStep
        const isCurrent = index === currentStep
        const isClickable = onStepClick && (isCompleted || index === currentStep + 1)
        
        return (
          <div
            key={step.id}
            className={cn(
              'flex flex-1',
              !isHorizontal && 'flex-1'
            )}
          >
            <div
              className={cn(
                'flex items-start gap-3',
                isHorizontal ? 'w-full' : 'w-full'
              )}
            >
              {/* Step Indicator */}
              <div className="relative flex flex-col items-center">
                <motion.button
                  onClick={() => isClickable && onStepClick?.(index)}
                  disabled={!isClickable}
                  className={cn(
                    'relative z-10 flex items-center justify-center rounded-full font-medium transition-all',
                    styles.stepSize,
                    isCompleted
                      ? 'bg-primary text-primary-foreground'
                      : isCurrent
                      ? 'bg-primary text-primary-foreground elevation-2'
                      : 'bg-surface-container text-on-surface-variant border-2 border-outline',
                    isClickable && 'cursor-pointer hover:scale-110',
                    !isClickable && 'cursor-default'
                  )}
                  whileHover={isClickable ? { scale: 1.1 } : undefined}
                  whileTap={isClickable ? { scale: 0.95 } : undefined}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {isCompleted ? (
                    <Check className={styles.iconSize} />
                  ) : step.icon ? (
                    <span className={styles.iconSize}>{step.icon}</span>
                  ) : (
                    <span className={styles.textSize}>{index + 1}</span>
                  )}
                </motion.button>
                
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'absolute top-1/2 -translate-y-1/2 bg-outline transition-colors',
                      isHorizontal
                        ? 'left-full w-full'
                        : 'top-full h-full w-0.5',
                      styles.connectorHeight,
                      isCompleted && 'bg-primary'
                    )}
                  />
                )}
              </div>
              
              {/* Step Content */}
              <div
                className={cn(
                  'flex flex-col gap-0.5',
                  isHorizontal ? 'flex-1 pt-1' : 'pt-2'
                )}
              >
                <span
                  className={cn(
                    'font-medium transition-colors',
                    styles.textSize,
                    isCurrent
                      ? 'text-primary'
                      : isCompleted
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {step.label}
                </span>
                {step.description && (
                  <p
                    className={cn(
                      'text-body-small text-muted-foreground',
                      isHorizontal && 'line-clamp-1'
                    )}
                  >
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export interface MStepContentProps {
  step: number
  currentStep: number
  children?: React.ReactNode
  className?: string
}

const MStepContent = ({ step, currentStep, children, className }: MStepContentProps) => {
  if (step !== currentStep) return null
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={cn('mt-6', className)}
    >
      {children}
    </motion.div>
  )
}

export { MStepper, MStepContent }
