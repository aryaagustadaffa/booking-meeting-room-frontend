import { apiClient } from './api'
import type {
  Booking,
  CreateBookingRequest,
  UpdateBookingRequest,
  BookingFilters,
  PaginatedResponse,
} from '@/types'

export const bookingService = {
  async getBookings(filters?: BookingFilters) {
    return apiClient.get<PaginatedResponse<Booking>>('/bookings', filters)
  },

  async getMyBookings(filters?: BookingFilters) {
    return apiClient.get<PaginatedResponse<Booking>>('/bookings/my', filters)
  },

  async getBookingById(id: string) {
    return apiClient.get<Booking>(`/bookings/${id}`)
  },

  async createBooking(data: CreateBookingRequest) {
    return apiClient.post<Booking>('/bookings', data)
  },

  async updateBooking(id: string, data: UpdateBookingRequest) {
    return apiClient.put<Booking>(`/bookings/${id}`, data)
  },

  async cancelBooking(id: string) {
    return apiClient.patch<Booking>(`/bookings/${id}/cancel`)
  },

  async approveBooking(id: string) {
    return apiClient.patch<Booking>(`/bookings/${id}/approve`)
  },

  async rejectBooking(id: string, reason: string) {
    return apiClient.patch<Booking>(`/bookings/${id}/reject`, { reason })
  },

  async getPendingBookings() {
    return apiClient.get<PaginatedResponse<Booking>>('/bookings/pending')
  },
}
