'use client'

import * as React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingOverlayProps {
  isLoading: boolean
  children: React.ReactNode
  className?: string
  overlayClassName?: string
  spinnerClassName?: string
}

export function LoadingOverlay({
  isLoading,
  children,
  className,
  overlayClassName,
  spinnerClassName,
}: LoadingOverlayProps) {
  return (
    <div className={cn('relative', className)}>
      {children}
      {isLoading && (
        <div
          className={cn(
            'absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm',
            overlayClassName
          )}
          role="status"
          aria-live="polite"
          aria-label="Loading"
        >
          <Loader2
            className={cn('h-8 w-8 animate-spin text-primary', spinnerClassName)}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  )
}
