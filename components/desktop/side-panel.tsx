'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface SidePanelProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  actions?: React.ReactNode
  width?: 'sm' | 'md' | 'lg' | 'xl'
  position?: 'right' | 'left'
  className?: string
  overlay?: boolean
  showCloseButton?: boolean
}

const widthClasses = {
  sm: 'w-[320px] min-w-panel',
  md: 'w-[400px] min-w-panel-lg',
  lg: 'w-[500px]',
  xl: 'w-[600px]',
}

export function SidePanel({
  isOpen,
  onClose,
  children,
  title,
  actions,
  width = 'md',
  position = 'right',
  className,
  overlay = true,
  showCloseButton = true,
}: SidePanelProps) {
  const slideDirection = position === 'right' ? 'translate-x-full' : '-translate-x-full'
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          {overlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              onClick={onClose}
            />
          )}
          
          {/* Panel */}
          <motion.div
            initial={{ x: position === 'right' ? '100%' : '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: position === 'right' ? '100%' : '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={cn(
              'fixed top-0 bottom-0 z-50 flex flex-col bg-surface shadow-panel',
              position === 'right' ? 'right-0' : 'left-0',
              widthClasses[width],
              className
            )}
          >
            {/* Header */}
            {(title || showCloseButton || actions) && (
              <div className="flex items-center justify-between border-b border-subtle px-6 py-4">
                {title && (
                  <h2 className="text-heading-md font-semibold text-foreground">
                    {title}
                  </h2>
                )}
                <div className="flex items-center gap-2">
                  {actions}
                  {showCloseButton && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onClose}
                      className="h-8 w-8"
                      aria-label="Close panel"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            )}
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export interface SidePanelSectionProps {
  title?: string
  children: React.ReactNode
  className?: string
  collapsible?: boolean
  defaultCollapsed?: boolean
}

export function SidePanelSection({
  title,
  children,
  className,
  collapsible = false,
  defaultCollapsed = false,
}: SidePanelSectionProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)
  
  return (
    <div className={cn('border-b border-subtle', className)}>
      {title && (
        <button
          onClick={() => collapsible && setIsCollapsed(!isCollapsed)}
          className={cn(
            'flex w-full items-center justify-between px-6 py-4',
            collapsible && 'cursor-pointer hover:bg-surface-container-low transition-colors'
          )}
        >
          <h3 className="text-label-lg font-medium text-foreground">
            {title}
          </h3>
          {collapsible && (
            <motion.div
              animate={{ rotate: isCollapsed ? -90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </motion.div>
          )}
        </button>
      )}
      <AnimatePresence mode="wait">
        {(!collapsible || !isCollapsed) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export interface SidePanelItemProps {
  label: string
  value: React.ReactNode
  icon?: React.ReactNode
  className?: string
}

export function SidePanelItem({ label, value, icon, className }: SidePanelItemProps) {
  return (
    <div className={cn('flex items-start gap-3 py-2', className)}>
      {icon && (
        <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center text-muted-foreground">
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-body-xs text-muted-foreground mb-0.5">
          {label}
        </p>
        <p className="text-body-sm text-foreground break-words">
          {value}
        </p>
      </div>
    </div>
  )
}
