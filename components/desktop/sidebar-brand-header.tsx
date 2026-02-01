'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Building2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export interface SidebarBrandHeaderProps {
  isExpanded?: boolean
  logo?: React.ReactNode
  className?: string
}

export function SidebarBrandHeader({
  isExpanded = true,
  logo,
  className
}: SidebarBrandHeaderProps) {
  return (
    <div className={cn('flex flex-col px-4 py-4', className)}>
      {/* Brand Header */}
      <Link
        href="/"
        className={cn(
          'flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-muted/50',
          !isExpanded && 'justify-center px-0'
        )}
      >
        {/* Logo Icon */}
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-sm ring-1 ring-primary/10">
          {logo || <Building2 className="h-5 w-5" />}
        </div>

        {/* Brand Text */}
        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="flex flex-col overflow-hidden"
            >
              <span className="text-sm font-semibold text-foreground">
                Meeting Room
              </span>
              <span className="text-xs text-muted-foreground">
                Booking System
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </Link>

      {/* Divider */}
      <div className="mt-3 h-px w-full bg-border/50" />
    </div>
  )
}
