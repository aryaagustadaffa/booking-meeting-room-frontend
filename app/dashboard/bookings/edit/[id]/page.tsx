'use client'

import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { updateBookingSchema, type UpdateBookingFormData } from '@/lib/validations/booking'
import { bookingService } from '@/services/booking.service'
import { roomService } from '@/services/room.service'
import type { ApiResponse, Booking, Room } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertCircle, ArrowLeft, Loader2 } from 'lucide-react'

export default function EditBookingPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdateBookingFormData>({
    resolver: zodResolver(updateBookingSchema),
  })

  const { data: bookingData, isLoading: bookingLoading } = useQuery<ApiResponse<Booking>>({
    queryKey: ['booking', params.id],
    queryFn: () => bookingService.getBookingById(params.id),
  })

  // Derive booking from data
  const booking = useMemo(() => bookingData?.data, [bookingData?.data])

  // Derive isReadOnly based on booking status
  const isReadOnly = useMemo(() => booking?.status === 'cancelled', [booking?.status])

  // Derive isTimeDisabled based on booking status
  const isTimeDisabled = useMemo(() => booking?.status === 'approved', [booking?.status])

  // Handle booking data changes using useEffect
  useEffect(() => {
    if (booking) {
      reset({
        roomId: booking.roomId,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
        description: booking.description,
      })
    }
  }, [booking, reset])

  const { data: roomsData, isLoading: roomsLoading } = useQuery({
    queryKey: ['rooms'],
    queryFn: () => roomService.getRooms(),
  })

  const updateMutation = useMutation({
    mutationFn: (data: UpdateBookingFormData) =>
      bookingService.updateBooking(params.id, data),
  })

  // Handle mutation success/error using useEffect
  useEffect(() => {
    if (updateMutation.isSuccess) {
      toast.success('Booking updated successfully!')
      router.push(`/dashboard/bookings/${params.id}`)
    } else if (updateMutation.isError) {
      toast.error(updateMutation.error.message || 'Failed to update booking')
    }
  }, [updateMutation.isSuccess, updateMutation.isError, updateMutation.error, router, params.id])

  const onSubmit = (data: UpdateBookingFormData) => {
    updateMutation.mutate(data)
  }

  if (bookingLoading) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <Skeleton className="h-8 w-48" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent className="space-y-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <div className="grid gap-4 md:grid-cols-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center space-y-4 py-12">
            <AlertCircle className="h-12 w-12 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Booking Not Found</h2>
            <p className="text-center text-muted-foreground">
              The booking you&apos;re looking for doesn&apos;t exist or you don&apos;t have access to it.
            </p>
            <Button onClick={() => router.push('/dashboard/bookings')}>
              Back to Bookings
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Header */}
      <div>
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">Edit Booking</h1>
        <p className="text-muted-foreground">
          Update your booking details
        </p>
      </div>

      {/* Warning for cancelled bookings */}
      {isReadOnly && (
        <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950">
          <CardContent className="flex items-start gap-3 p-4">
            <AlertCircle className="mt-0.5 h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            <div>
              <p className="font-semibold text-yellow-800 dark:text-yellow-200">
                Cannot Edit Cancelled Booking
              </p>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                This booking has been cancelled and cannot be modified.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Warning for approved bookings */}
      {booking.status === 'approved' && !isReadOnly && (
        <Card className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950">
          <CardContent className="flex items-start gap-3 p-4">
            <AlertCircle className="mt-0.5 h-5 w-5 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="font-semibold text-blue-800 dark:text-blue-200">
                Time Cannot Be Changed
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                This booking has been approved. You can only update the description.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Room Selection */}
            <div className="space-y-2">
              <Label htmlFor="roomId">Room</Label>
              {roomsLoading ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <Select
                  disabled={isReadOnly || isTimeDisabled}
                  defaultValue={booking.roomId}
                  onValueChange={(value) => {
                    register('roomId').onChange({ target: { value } })
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roomsData?.data?.map((room: Room) => (
                      <SelectItem key={room.id} value={room.id}>
                        {room.name} (Capacity: {room.capacity})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <input
                type="hidden"
                {...register('roomId')}
              />
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                disabled={isReadOnly || isTimeDisabled}
                {...register('date')}
              />
            </div>

            {/* Time Selection */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  disabled={isReadOnly || isTimeDisabled}
                  {...register('startTime')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  disabled={isReadOnly || isTimeDisabled}
                  {...register('endTime')}
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the purpose of your booking..."
                rows={4}
                disabled={isReadOnly}
                {...register('description')}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || isReadOnly}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Booking'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
