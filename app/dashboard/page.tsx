'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { bookingService } from '@/services/booking.service'
import { MCard, MCardHeader, MCardTitle, MCardContent } from '@/components/material/m-card'
import { MButton } from '@/components/material/m-button'
import { MBadge } from '@/components/material/m-badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Calendar,
  Clock,
  Plus,
  Eye,
  AlertCircle,
  CheckCircle2,
  XCircle,
  CalendarX,
  ArrowRight,
} from 'lucide-react'
import { formatDate, formatTime } from '@/lib/utils'
import type { Booking } from '@/types'
import { motion } from 'framer-motion'

const statusConfig: Record<Booking['status'], { icon: typeof CheckCircle2; variant: 'primary' | 'warning' | 'error' | 'surface'; label: string }> = {
  pending: { icon: AlertCircle, variant: 'warning', label: 'Pending' },
  approved: { icon: CheckCircle2, variant: 'primary', label: 'Approved' },
  rejected: { icon: XCircle, variant: 'error', label: 'Rejected' },
  cancelled: { icon: CalendarX, variant: 'surface', label: 'Cancelled' },
}

export default function DashboardPage() {
  const { data: bookingsData, isLoading } = useQuery({
    queryKey: ['my-bookings-recent'],
    queryFn: () => bookingService.getMyBookings({ page: 1, limit: 5 }),
  })

  const recentBookings = bookingsData?.data?.data || []
  const pendingCount = bookingsData?.data?.data?.filter((b: Booking) => b.status === 'pending').length || 0
  const approvedCount = bookingsData?.data?.data?.filter((b: Booking) => b.status === 'approved').length || 0
  const totalBookings = bookingsData?.data?.pagination?.total || 0

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0, 0, 0.2, 1] as const,
      },
    },
  } as const

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants}>
        <h1 className="text-display-small font-semibold tracking-tight">
          Welcome back!
        </h1>
        <p className="text-body-large text-muted-foreground mt-1">
          Here&apos;s an overview of your bookings.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={itemVariants}
        className="grid gap-4 md:grid-cols-3"
      >
        <MCard variant="elevated" hover>
          <MCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <MCardTitle className="text-label-medium font-medium text-muted-foreground">
              Total Bookings
            </MCardTitle>
            <div className="rounded-xl bg-primary/10 p-2">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
          </MCardHeader>
          <MCardContent>
            <div className="text-display-small font-semibold text-foreground">
              {totalBookings}
            </div>
            <p className="text-body-small text-muted-foreground mt-1">
              All time bookings
            </p>
          </MCardContent>
        </MCard>

        <MCard variant="elevated" hover>
          <MCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <MCardTitle className="text-label-medium font-medium text-muted-foreground">
              Pending
            </MCardTitle>
            <div className="rounded-xl bg-warning/10 p-2">
              <AlertCircle className="h-5 w-5 text-warning" />
            </div>
          </MCardHeader>
          <MCardContent>
            <div className="text-display-small font-semibold text-foreground">
              {pendingCount}
            </div>
            <p className="text-body-small text-muted-foreground mt-1">
              Awaiting approval
            </p>
          </MCardContent>
        </MCard>

        <MCard variant="elevated" hover>
          <MCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <MCardTitle className="text-label-medium font-medium text-muted-foreground">
              Approved
            </MCardTitle>
            <div className="rounded-xl bg-primary/10 p-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
            </div>
          </MCardHeader>
          <MCardContent>
            <div className="text-display-small font-semibold text-foreground">
              {approvedCount}
            </div>
            <p className="text-body-small text-muted-foreground mt-1">
              Confirmed bookings
            </p>
          </MCardContent>
        </MCard>
      </motion.div>

      {/* Recent Bookings */}
      <motion.div variants={itemVariants}>
        <MCard variant="elevated">
          <MCardHeader className="flex flex-row items-center justify-between">
            <MCardTitle>Recent Bookings</MCardTitle>
            <Link href="/dashboard/bookings">
              <MButton variant="text" size="sm">
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </MButton>
            </Link>
          </MCardHeader>
          <MCardContent>
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between space-x-4">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                ))}
              </div>
            ) : recentBookings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-surface-container-high p-4 mb-4">
                  <Calendar className="h-12 w-12 text-muted-foreground" />
                </div>
                <p className="text-body-large text-muted-foreground mb-4">
                  No bookings yet
                </p>
                <Link href="/dashboard/bookings/create">
                  <MButton variant="filled">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Booking
                  </MButton>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentBookings.map((booking: Booking, index) => {
                  const status = statusConfig[booking.status]
                  const StatusIcon = status.icon
                  return (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group flex items-center justify-between rounded-xl border border-outline/50 bg-surface-container-low p-4 transition-all hover:elevation-2 hover:bg-surface-container"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <p className="text-title-medium font-medium text-foreground">
                            {booking.room?.name || 'Unknown Room'}
                          </p>
                          <MBadge variant={status.variant} size="sm">
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {status.label}
                          </MBadge>
                        </div>
                        <div className="flex items-center gap-4 text-body-medium text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            {formatDate(booking.date)}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                          </div>
                        </div>
                      </div>
                      <Link href={`/dashboard/bookings/${booking.id}`}>
                        <MButton variant="text" size="icon">
                          <Eye className="h-5 w-5" />
                        </MButton>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </MCardContent>
        </MCard>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        variants={itemVariants}
        className="grid gap-4 md:grid-cols-2"
      >
        <MCard variant="elevated">
          <MCardHeader>
            <MCardTitle>Quick Actions</MCardTitle>
          </MCardHeader>
          <MCardContent className="space-y-2">
            <Link href="/dashboard/bookings/create" className="block">
              <MButton variant="outlined" className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Create New Booking
              </MButton>
            </Link>
            <Link href="/dashboard/bookings" className="block">
              <MButton variant="outlined" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                View All Bookings
              </MButton>
            </Link>
          </MCardContent>
        </MCard>

        <MCard variant="elevated">
          <MCardHeader>
            <MCardTitle>Need Help?</MCardTitle>
          </MCardHeader>
          <MCardContent>
            <p className="text-body-medium text-muted-foreground mb-4">
              Having trouble with your bookings? Contact the administrator for assistance.
            </p>
            <MButton variant="outlined" className="w-full">
              Contact Support
            </MButton>
          </MCardContent>
        </MCard>
      </motion.div>
    </motion.div>
  )
}
