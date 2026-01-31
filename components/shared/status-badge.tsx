'use client'

import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Clock, XCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export type BookingStatus = 'pending' | 'approved' | 'rejected' | 'cancelled'

interface StatusBadgeProps {
  status: BookingStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    pending: {
      label: 'Pending',
      icon: Clock,
      variant: 'secondary' as const,
      className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    },
    approved: {
      label: 'Approved',
      icon: CheckCircle2,
      variant: 'default' as const,
      className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    },
    rejected: {
      label: 'Rejected',
      icon: XCircle,
      variant: 'destructive' as const,
      className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    },
    cancelled: {
      label: 'Cancelled',
      icon: X,
      variant: 'outline' as const,
      className: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400',
    },
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Badge className={cn('gap-1.5 font-medium', config.className, className)}>
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      <span>{config.label}</span>
    </Badge>
  )
}
