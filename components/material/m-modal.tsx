'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

export interface MModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
  title?: string
  description?: string
  showCloseButton?: boolean
}

const MModal = ({
  open = false,
  onOpenChange,
  children,
  title,
  description,
  showCloseButton = true,
}: MModalProps) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => onOpenChange?.(false)}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative w-full max-w-lg rounded-2xl bg-surface-container p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {showCloseButton && (
                <button
                  onClick={() => onOpenChange?.(false)}
                  className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground transition-colors hover:bg-surface-container-high hover:text-foreground"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
              
              {(title || description) && (
                <div className="mb-4">
                  {title && (
                    <h2 className="text-title-large font-semibold text-foreground">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className="mt-1 text-body-medium text-muted-foreground">
                      {description}
                    </p>
                  )}
                </div>
              )}
              
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export interface MModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'left' | 'center' | 'right'
}

const MModalFooter = React.forwardRef<HTMLDivElement, MModalFooterProps>(
  ({ className, align = 'right', children, ...props }, ref) => {
    const alignStyles = {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
    }
    
    return (
      <div
        ref={ref}
        className={cn('flex gap-2 pt-4', alignStyles[align], className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
MModalFooter.displayName = 'MModalFooter'

export { MModal, MModalFooter }
