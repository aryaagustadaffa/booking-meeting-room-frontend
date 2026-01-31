import { z } from 'zod'

const bookingBaseSchema = z.object({
  roomId: z.string().min(1, 'Room is required'),
  date: z.string().min(1, 'Date is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  description: z.string().min(1, 'Description is required').min(10, 'Description must be at least 10 characters'),
})

export const createBookingSchema = bookingBaseSchema.refine((data) => {
  if (!data.startTime || !data.endTime) return true
  const start = new Date(`2000-01-01T${data.startTime}`)
  const end = new Date(`2000-01-01T${data.endTime}`)
  return end > start
}, {
  message: 'End time must be after start time',
  path: ['endTime'],
})

export type CreateBookingFormData = z.infer<typeof createBookingSchema>

export const updateBookingSchema = bookingBaseSchema.partial()

export type UpdateBookingFormData = z.infer<typeof updateBookingSchema>

export const bookingFiltersSchema = z.object({
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  status: z.enum(['pending', 'approved', 'rejected', 'cancelled']).optional(),
  roomId: z.string().optional(),
  search: z.string().optional(),
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).max(100).optional(),
})

export type BookingFiltersFormData = z.infer<typeof bookingFiltersSchema>
