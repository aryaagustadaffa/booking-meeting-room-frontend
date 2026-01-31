'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TimelineItem {
  id: string
  title: string
  description?: string
  timestamp: string
  icon?: React.ReactNode
  status?: 'completed' | 'pending' | 'current' | 'error'
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {items.map((item, index) => (
        <div key={item.id} className="relative flex gap-4">
          {/* Timeline line */}
          {index !== items.length - 1 && (
            <div className="absolute left-[19px] top-10 h-[calc(100%-8px)] w-0.5 bg-border" />
          )}

          {/* Icon */}
          <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-background">
            {item.icon || (
              <div
                className={cn('h-3 w-3 rounded-full', {
                  'bg-primary': item.status === 'completed',
                  'bg-primary animate-pulse': item.status === 'current',
                  'bg-muted-foreground': item.status === 'pending',
                  'bg-destructive': item.status === 'error',
                })}
              />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 space-y-1 pb-4">
            <div className="flex items-center justify-between gap-2">
              <p className="font-medium">{item.title}</p>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {item.timestamp}
              </span>
            </div>
            {item.description && (
              <p className="text-sm text-muted-foreground">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
