'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  Plus,
  Search,
  X,
  MapPin,
  Clock,
} from 'lucide-react'
import { WideCard, WideCardContent } from '@/components/desktop'
import { DesktopTable, DesktopTableHeader, DesktopTableBody, DesktopTableRow, DesktopTableHead, DesktopTableCell } from '@/components/desktop'
import { MButton } from '@/components/material/m-button'
import { MBadge } from '@/components/material/m-badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { StatusBadge } from '@/components/shared/status-badge'
import { bookingService } from '@/services/booking.service'
import { roomService } from '@/services/room.service'
import type { Booking, BookingFilters, Room } from '@/types'
import { formatDate, formatTime } from '@/lib/utils'
import { PageTransition, ListEnterAnimation, ListItem } from '@/components/material/page-transition'
import { motion } from 'framer-motion'

const statusConfig: Record<Booking['status'], { variant: 'primary' | 'warning' | 'error' | 'surface' }> = {
  pending: { variant: 'warning' },
  approved: { variant: 'primary' },
  rejected: { variant: 'error' },
  cancelled: { variant: 'surface' },
}

export default function BookingsPage() {
  const [filters, setFilters] = useState<BookingFilters>({
    page: 1,
    limit: 10,
    status: undefined,
    roomId: undefined,
    search: '',
    dateFrom: undefined,
    dateTo: undefined,
  })

  const { data: bookingsData, isLoading } = useQuery({
    queryKey: ['my-bookings', filters],
    queryFn: () => bookingService.getMyBookings(filters),
  })

  const { data: rooms } = useQuery({
    queryKey: ['rooms'],
    queryFn: () => roomService.getRooms(),
  })

  const handleFilterChange = (key: keyof BookingFilters, value: string | undefined) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
      page: 1,
    }))
  }

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }))
  }

  const clearFilters = () => {
    setFilters({
      page: 1,
      limit: 10,
    })
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="text-heading-xl font-semibold tracking-tight">
              My Bookings
            </h1>
            <p className="text-body-md text-muted-foreground mt-1">
              Manage your meeting room bookings
            </p>
          </div>
          <Link href="/dashboard/bookings/create">
            <MButton variant="filled" className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              New Booking
            </MButton>
          </Link>
        </motion.div>

        {/* Filters */}
        <WideCard variant="outlined" padding="md">
          <WideCardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              <div className="space-y-2">
                <label htmlFor="search" className="text-label-md font-medium">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search bookings..."
                    value={filters.search || ''}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="status" className="text-label-md font-medium">
                  Status
                </label>
                <Select
                  value={filters.status || 'all'}
                  onValueChange={(value) =>
                    handleFilterChange('status', value === 'all' ? undefined : value)
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="room" className="text-label-md font-medium">
                  Room
                </label>
                <Select
                  value={filters.roomId || 'all'}
                  onValueChange={(value) =>
                    handleFilterChange('roomId', value === 'all' ? undefined : value)
                  }
                >
                  <SelectTrigger id="room">
                    <SelectValue placeholder="All rooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All rooms</SelectItem>
                    {rooms?.data?.map((room: Room) => (
                      <SelectItem key={room.id} value={room.id}>
                        {room.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="dateFrom" className="text-label-md font-medium">
                  From Date
                </label>
                <Input
                  id="dateFrom"
                  type="date"
                  value={filters.dateFrom || ''}
                  onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="dateTo" className="text-label-md font-medium">
                  To Date
                </label>
                <Input
                  id="dateTo"
                  type="date"
                  value={filters.dateTo || ''}
                  onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <MButton variant="outlined" onClick={clearFilters}>
                <X className="mr-2 h-4 w-4" />
                Clear Filters
              </MButton>
            </div>
          </WideCardContent>
        </WideCard>

        {/* Table */}
        <WideCard variant="elevated" padding="none">
          <WideCardContent>
            {isLoading ? (
              <div className="space-y-4 p-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between space-x-4">
                    <div className="space-y-2">
                      <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                      <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                    </div>
                    <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
                  </div>
                ))}
              </div>
            ) : bookingsData?.data?.data?.length === 0 ? (
              <div className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-container-high">
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-label-lg font-semibold">No bookings found</h3>
                  <p className="text-body-sm text-muted-foreground">
                    Try adjusting your filters or create a new booking
                  </p>
                </div>
                <MButton variant="text" onClick={clearFilters}>
                  Clear filters
                </MButton>
              </div>
            ) : (
              <DesktopTable stickyHeader compact={false} hoverable={true} striped={true}>
                <DesktopTableHeader>
                  <DesktopTableRow>
                    <DesktopTableHead>Room</DesktopTableHead>
                    <DesktopTableHead>Date</DesktopTableHead>
                    <DesktopTableHead>Time</DesktopTableHead>
                    <DesktopTableHead>Description</DesktopTableHead>
                    <DesktopTableHead>Status</DesktopTableHead>
                    <DesktopTableHead align="right">Actions</DesktopTableHead>
                  </DesktopTableRow>
                </DesktopTableHeader>
                <DesktopTableBody>
                  {bookingsData?.data?.data.map((booking: Booking, index) => (
                    <DesktopTableRow key={booking.id} index={index}>
                      <DesktopTableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10">
                            <MapPin className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-body-sm font-medium">
                            {booking.room?.name || 'Unknown'}
                          </span>
                        </div>
                      </DesktopTableCell>
                      <DesktopTableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-body-sm">
                            {formatDate(booking.date)}
                          </span>
                        </div>
                      </DesktopTableCell>
                      <DesktopTableCell>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-body-sm">
                            {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                          </span>
                        </div>
                      </DesktopTableCell>
                      <DesktopTableCell>
                        <span className="text-body-sm text-muted-foreground line-clamp-1 max-w-xs">
                          {booking.description || '-'}
                        </span>
                      </DesktopTableCell>
                      <DesktopTableCell>
                        <MBadge variant={statusConfig[booking.status].variant} size="sm">
                          <StatusBadge status={booking.status} />
                        </MBadge>
                      </DesktopTableCell>
                      <DesktopTableCell align="right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/dashboard/bookings/${booking.id}`}>
                            <MButton variant="text" size="icon" aria-label="View booking">
                              <Eye className="h-4 w-4" />
                            </MButton>
                          </Link>
                          {(booking.status === 'pending' || booking.status === 'approved') && (
                            <Link href={`/dashboard/bookings/edit/${booking.id}`}>
                              <MButton variant="text" size="icon" aria-label="Edit booking">
                                <Edit className="h-4 w-4" />
                              </MButton>
                            </Link>
                          )}
                        </div>
                      </DesktopTableCell>
                    </DesktopTableRow>
                  ))}
                </DesktopTableBody>
              </DesktopTable>
            )}
          </WideCardContent>

          {/* Pagination */}
          {bookingsData?.data?.pagination && (
            <div className="flex flex-col gap-4 border-t border-subtle px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-body-sm text-muted-foreground">
                Showing {((bookingsData.data.pagination.page - 1) * bookingsData.data.pagination.limit) + 1} to{' '}
                {Math.min(
                  bookingsData.data.pagination.page * bookingsData.data.pagination.limit,
                  bookingsData.data.pagination.total
                )}{' '}
                of {bookingsData.data.pagination.total} bookings
              </p>
              <div className="flex items-center gap-2">
                <MButton
                  variant="outlined"
                  size="icon"
                  onClick={() => handlePageChange((bookingsData?.data?.pagination?.page || 0) - 1)}
                  disabled={bookingsData.data.pagination.page === 1}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </MButton>
                <span className="text-body-sm">
                  Page {bookingsData.data.pagination.page} of{' '}
                  {bookingsData.data.pagination.totalPages}
                </span>
                <MButton
                  variant="outlined"
                  size="icon"
                  onClick={() => handlePageChange((bookingsData?.data?.pagination?.page || 0) + 1)}
                  disabled={
                    bookingsData.data.pagination.page ===
                    bookingsData.data.pagination.totalPages
                  }
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </MButton>
              </div>
            </div>
          )}
        </WideCard>
      </div>
    </PageTransition>
  )
}
