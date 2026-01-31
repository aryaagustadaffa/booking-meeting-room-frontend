'use client'

import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  CheckCircle2,
  Loader2,
  RefreshCw,
  XCircle,
  Calendar,
  MapPin,
  Clock,
  User,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ResponsiveTable, type Column } from '@/components/shared/responsive-table'
import { StatusBadge } from '@/components/shared/status-badge'
import { ConfirmDialog } from '@/components/shared/confirm-dialog'
import { EmptyState } from '@/components/shared/empty-state'
import { bookingService } from '@/services/booking.service'
import type { Booking, BookingFilters } from '@/types'
import { formatDate, formatTime } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function AdminBookingsPage() {
  const queryClient = useQueryClient()
  const [filters] = useState<BookingFilters>({
    page: 1,
    limit: 10,
    status: 'pending',
  })
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [rejectionReason, setRejectionReason] = useState('')

  const { data: bookingsData, isLoading, refetch } = useQuery({
    queryKey: ['pending-bookings', filters],
    queryFn: () => bookingService.getPendingBookings(),
  })

  const approveMutation = useMutation({
    mutationFn: (id: string) => bookingService.approveBooking(id),
    onSuccess: () => {
      toast.success('Booking approved successfully!')
      queryClient.invalidateQueries({ queryKey: ['pending-bookings'] })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to approve booking')
    },
  })

  const rejectMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      bookingService.rejectBooking(id, reason),
    onSuccess: () => {
      toast.success('Booking rejected successfully!')
      setRejectDialogOpen(false)
      setRejectionReason('')
      setSelectedBooking(null)
      queryClient.invalidateQueries({ queryKey: ['pending-bookings'] })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to reject booking')
    },
  })

  const handleApprove = (booking: Booking) => {
    approveMutation.mutate(booking.id)
  }

  const handleRejectClick = (booking: Booking) => {
    setSelectedBooking(booking)
    setRejectDialogOpen(true)
  }

  const handleRejectConfirm = () => {
    if (selectedBooking && rejectionReason.trim()) {
      rejectMutation.mutate({
        id: selectedBooking.id,
        reason: rejectionReason,
      })
    }
  }

  const columns: Column<Booking>[] = [
    {
      key: 'user',
      header: 'User',
      cellClassName: 'font-medium',
      render: (booking) => (
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <User className="h-4 w-4 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{booking.user?.name || 'Unknown'}</span>
            <span className="text-xs text-muted-foreground">{booking.user?.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'room',
      header: 'Room',
      render: (booking) => (
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <MapPin className="h-4 w-4 text-primary" />
          </div>
          <span>{booking.room?.name || 'Unknown'}</span>
        </div>
      ),
    },
    {
      key: 'date',
      header: 'Date',
      render: (booking) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{formatDate(booking.date)}</span>
        </div>
      ),
    },
    {
      key: 'time',
      header: 'Time',
      render: (booking) => (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>
            {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
          </span>
        </div>
      ),
    },
    {
      key: 'description',
      header: 'Description',
      cellClassName: 'max-w-xs truncate',
    },
    {
      key: 'actions',
      header: '',
      className: 'text-right',
      cellClassName: 'text-right',
      render: (booking) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleApprove(booking)}
            disabled={approveMutation.isPending}
            aria-label="Approve booking"
          >
            <CheckCircle2 className="mr-1 h-4 w-4" />
            Approve
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleRejectClick(booking)}
            disabled={rejectMutation.isPending}
            aria-label="Reject booking"
          >
            <XCircle className="mr-1 h-4 w-4" />
            Reject
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Pending Bookings
          </h1>
          <p className="text-muted-foreground">
            Review and approve or reject booking requests
          </p>
        </div>
        <Button variant="outline" onClick={() => refetch()} className="w-full sm:w-auto">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Requests
            </CardTitle>
            <Loader2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {bookingsData?.data?.data?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Waiting for approval
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <ResponsiveTable
            data={bookingsData?.data?.data || []}
            columns={columns}
            isLoading={isLoading}
            emptyMessage={
              <EmptyState
                icon={CheckCircle2}
                title="No pending bookings"
                description="All bookings have been processed"
              />
            }
          />
        </CardContent>
      </Card>

      {/* Reject Dialog */}
      <ConfirmDialog
        open={rejectDialogOpen}
        onOpenChange={setRejectDialogOpen}
        title="Reject Booking"
        description={'Please provide a reason for rejecting this booking.'}
        confirmText="Reject Booking"
        variant="destructive"
        onConfirm={handleRejectConfirm}
        isConfirming={rejectMutation.isPending}
      >
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="reason">Reason *</Label>
            <Textarea
              id="reason"
              placeholder="Enter reason for rejection..."
              rows={4}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
          </div>
        </div>
      </ConfirmDialog>
    </div>
  )
}
