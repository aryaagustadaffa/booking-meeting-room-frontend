'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createBookingSchema, type CreateBookingFormData } from '@/lib/validations/booking'
import { bookingService } from '@/services/booking.service'
import { roomService } from '@/services/room.service'
import type { Room } from '@/types'
import { Button } from '@/components/ui/button'
import { FloatingLabelInput } from '@/components/ui/floating-label-input'
import { FloatingLabelTextarea } from '@/components/ui/floating-label-textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { LoadingOverlay } from '@/components/shared/loading-overlay'
import {
  ArrowLeft,
  Loader2,
  MapPin,
  Users,
  Calendar,
  Clock,
  Info,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function CreateBookingPage() {
  const router = useRouter()
  const [selectedRoomId, setSelectedRoomId] = useState('')
  const [selectedDate, setSelectedDate] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateBookingFormData>({
    resolver: zodResolver(createBookingSchema),
  })

  const { data: roomsData, isLoading: roomsLoading } = useQuery({
    queryKey: ['rooms'],
    queryFn: () => roomService.getRooms(),
  })

  const createMutation = useMutation({
    mutationFn: (data: CreateBookingFormData) =>
      bookingService.createBooking(data),
    onSuccess: () => {
      toast.success('Booking created successfully!')
      router.push('/dashboard/bookings')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create booking')
    },
  })

  const onSubmit = (data: CreateBookingFormData) => {
    createMutation.mutate(data)
  }

  const selectedRoom = roomsData?.data?.find((room: Room) => room.id === selectedRoomId)

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">Create Booking</h1>
        <p className="text-muted-foreground">
          Book a meeting room for your next meeting
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
            <CardDescription>
              Fill in the required information to book a room
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoadingOverlay isLoading={isSubmitting}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Room Selection */}
                <div className="space-y-2">
                  <label htmlFor="roomId" className="text-sm font-medium">
                    Room *
                  </label>
                  {roomsLoading ? (
                    <Skeleton className="h-12 w-full" />
                  ) : (
                    <Select
                      onValueChange={(value) => {
                        setValue('roomId', value)
                        setSelectedRoomId(value)
                      }}
                    >
                      <SelectTrigger id="roomId" className="h-12">
                        <SelectValue placeholder="Select a room" />
                      </SelectTrigger>
                      <SelectContent>
                        {roomsData?.data?.map((room: Room) => (
                          <SelectItem key={room.id} value={room.id}>
                            <div className="flex items-center gap-2">
                              <span>{room.name}</span>
                              <span className="text-muted-foreground">
                                (Capacity: {room.capacity})
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  <input type="hidden" {...register('roomId')} />
                  {errors.roomId && (
                    <p className="text-sm text-destructive" role="alert">
                      {errors.roomId.message}
                    </p>
                  )}
                </div>

                {/* Date */}
                <FloatingLabelInput
                  id="date"
                  type="date"
                  label="Date *"
                  {...register('date')}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => {
                    register('date').onChange(e)
                    setSelectedDate(e.target.value)
                  }}
                  error={errors.date?.message}
                />

                {/* Time Selection */}
                <div className="grid gap-4 md:grid-cols-2">
                  <FloatingLabelInput
                    id="startTime"
                    type="time"
                    label="Start Time *"
                    {...register('startTime')}
                    error={errors.startTime?.message}
                  />
                  <FloatingLabelInput
                    id="endTime"
                    type="time"
                    label="End Time *"
                    {...register('endTime')}
                    error={errors.endTime?.message}
                  />
                </div>

                {/* Description */}
                <FloatingLabelTextarea
                  id="description"
                  label="Description *"
                  placeholder="Describe the purpose of your booking..."
                  rows={4}
                  {...register('description')}
                  error={errors.description?.message}
                />

                {/* Submit Button */}
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      'Create Booking'
                    )}
                  </Button>
                </div>
              </form>
            </LoadingOverlay>
          </CardContent>
        </Card>

        {/* Room Info */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Room Information</CardTitle>
            <CardDescription>
              Details about the selected room
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedRoom ? (
              <div className="space-y-4">
                {/* Room Name */}
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedRoom.name}
                  </h3>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedRoom.location}
                    </p>
                  </div>
                </div>

                {/* Capacity */}
                <div className="flex items-start gap-3">
                  <Users className="mt-0.5 h-5 w-5 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Capacity</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedRoom.capacity} people
                    </p>
                  </div>
                </div>

                {/* Facilities */}
                <div>
                  <p className="mb-2 text-sm font-medium">Facilities</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedRoom.facilities.map((facility, index) => (
                      <div
                        key={index}
                        className="rounded-full border bg-muted px-3 py-1 text-xs font-medium"
                      >
                        {facility}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <p className="mb-1 text-sm font-medium">Description</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedRoom.description}
                  </p>
                </div>

                {/* Info Box */}
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-muted-foreground shrink-0" />
                    <p className="text-xs text-muted-foreground">
                      Bookings are subject to approval. You will receive a notification once your booking is reviewed.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-40 items-center justify-center text-center">
                <div className="space-y-2">
                  <Calendar className="mx-auto h-10 w-10 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Select a room to view its details
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Available Rooms */}
      {!roomsLoading && roomsData?.data && (
        <Card>
          <CardHeader>
            <CardTitle>Available Rooms</CardTitle>
            <CardDescription>
              Browse all available meeting rooms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {roomsData.data.map((room: Room) => (
                <Card
                  key={room.id}
                  className={cn(
                    'cursor-pointer transition-all hover:shadow-md',
                    selectedRoomId === room.id &&
                      'ring-2 ring-primary ring-offset-2'
                  )}
                  onClick={() => {
                    setValue('roomId', room.id)
                    setSelectedRoomId(room.id)
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setValue('roomId', room.id)
                      setSelectedRoomId(room.id)
                    }
                  }}
                >
                  <CardContent className="p-4">
                    <h3 className="mb-2 font-semibold">{room.name}</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{room.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>Capacity: {room.capacity} people</span>
                      </div>
                      <p className="line-clamp-2">{room.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
