'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { bookingService } from '@/services/booking.service'
import { WideCard, WideCardHeader, WideCardTitle, WideCardContent, WideCardFooter, WideCardGrid, WideCardStat } from '@/components/desktop'
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
        <h1 className="text-heading-2xl font-semibold tracking-tight">
          Welcome back!
        </h1>
        <p className="text-body-md text-muted-foreground mt-1">
          Here&apos;s an overview of your bookings.
        </p>
      </motion.div>

      {/* Stats Cards - Desktop-First 12-Column Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-12 gap-6"
      >
        {/* Total Bookings - 4 columns */}
        <div className="col-span-12 md:col-span-4 lg:col-span-4">
          <WideCard variant="elevated" hoverLift="sm">
            <WideCardContent>
              <WideCardStat
                label="Total Bookings"
                value={totalBookings}
                icon={<Calendar className="h-5 w-5" />}
              />
            </WideCardContent>
          </WideCard>
        </div>

        {/* Pending - 4 columns */}
        <div className="col-span-12 md:col-span-4 lg:col-span-4">
          <WideCard variant="elevated" hoverLift="sm">
            <WideCardContent>
              <WideCardStat
                label="Pending"
                value={pendingCount}
                icon={<AlertCircle className="h-5 w-5" />}
              />
            </WideCardContent>
          </WideCard>
        </div>

        {/* Approved - 4 columns */}
        <div className="col-span-12 md:col-span-4 lg:col-span-4">
          <WideCard variant="elevated" hoverLift="sm">
            <WideCardContent>
              <WideCardStat
                label="Approved"
                value={approvedCount}
                icon={<CheckCircle2 className="h-5 w-5" />}
              />
            </WideCardContent>
          </WideCard>
        </div>
      </motion.div>

      {/* Recent Bookings - Full Width */}
      <motion.div variants={itemVariants}>
        <WideCard variant="elevated" padding="md">
          <WideCardHeader
            title="Recent Bookings"
            action={
              <Link href="/dashboard/bookings">
                <MButton variant="text" size="sm">
                  View All
                  <ArrowRight className="ml-1 h-4 w-4" />
                </MButton>
              </Link>
            }
          />
          <WideCardContent>
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
                <p className="text-body-md text-muted-foreground mb-4">
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
                      className="group flex items-center justify-between rounded-xl border border-subtle bg-surface-container-low p-4 transition-all hover:shadow-card hover:bg-surface-container"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <p className="text-label-lg font-medium text-foreground">
                            {booking.room?.name || 'Unknown Room'}
                          </p>
                          <MBadge variant={status.variant} size="sm">
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {status.label}
                          </MBadge>
                        </div>
                        <div className="flex items-center gap-4 text-body-sm text-muted-foreground">
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
          </WideCardContent>
        </WideCard>
      </motion.div>

      {/* Quick Actions - 6 columns each */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-12 gap-6"
      >
        <div className="col-span-12 md:col-span-6 lg:col-span-6">
          <WideCard variant="elevated" padding="md">
            <WideCardHeader title="Quick Actions" />
            <WideCardContent className="space-y-2">
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
            </WideCardContent>
          </WideCard>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-6">
          <WideCard variant="elevated" padding="md">
            <WideCardHeader title="Need Help?" />
            <WideCardContent>
              <p className="text-body-sm text-muted-foreground mb-4">
                Having trouble with your bookings? Contact the administrator for assistance.
              </p>
              <MButton variant="outlined" className="w-full">
                Contact Support
              </MButton>
            </WideCardContent>
          </WideCard>
        </div>
      </motion.div>
    </motion.div>
  )
}
