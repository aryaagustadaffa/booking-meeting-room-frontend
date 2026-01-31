'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

export interface MBottomSheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
  title?: string
  description?: string
  showCloseButton?: boolean
  snapPoints?: number[]
  defaultSnapPoint?: number
}

const MBottomSheet = ({
  open = false,
  onOpenChange,
  children,
  title,
  description,
  showCloseButton = true,
}: MBottomSheetProps) => {
  const sheetRef = React.useRef<HTMLDivElement>(null)
  
  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onOpenChange?.(false)
    }
  }
  
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
            onClick={handleBackdropClick}
          />
          
          {/* Bottom Sheet */}
          <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center">
            <motion.div
              ref={sheetRef}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 200,
              }}
              className="w-full max-w-2xl rounded-t-3xl bg-surface-container shadow-2xl"
            >
              {/* Drag Handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="h-1.5 w-12 rounded-full bg-outline/50" />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
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
                  
                  {showCloseButton && (
                    <button
                      onClick={() => onOpenChange?.(false)}
                      className="ml-4 rounded-full p-1 text-muted-foreground transition-colors hover:bg-surface-container-high hover:text-foreground"
                      aria-label="Close bottom sheet"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
                
                <div className="mt-4">
                  {children}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export interface MBottomSheetFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'left' | 'center' | 'right' | 'stretch'
}

const MBottomSheetFooter = React.forwardRef<HTMLDivElement, MBottomSheetFooterProps>(
  ({ className, align = 'stretch', children, ...props }, ref) => {
    const alignStyles = {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
      stretch: 'grid grid-cols-2 gap-2',
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
MBottomSheetFooter.displayName = 'MBottomSheetFooter'

export { MBottomSheet, MBottomSheetFooter }
