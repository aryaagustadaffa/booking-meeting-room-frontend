export interface User {
  id: string
  email: string
  name: string
  role: 'ADMIN' | 'USER'
  createdAt: string
  updatedAt: string
}

export interface Room {
  id: string
  name: string
  description: string
  capacity: number
  location: string
  facilities: string[]
  coverPhoto: string
  photos: string[]
  createdAt: string
  updatedAt: string
}

export interface RoomPhoto {
  id: string
  roomId: string
  photoUrl: string
  isCover: boolean
  createdAt: string
}

export interface RoomPhotosResponse {
  photos: RoomPhoto[]
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
  }
}

export interface Booking {
  id: string
  userId: string
  roomId: string
  room?: Room
  user?: User
  date: string
  startTime: string
  endTime: string
  description: string
  status: 'pending' | 'approved' | 'rejected' | 'cancelled'
  rejectionReason?: string
  createdAt: string
  updatedAt: string
}

export interface CreateBookingRequest {
  roomId: string
  date: string
  startTime: string
  endTime: string
  description: string
}

export interface UpdateBookingRequest {
  roomId?: string
  date?: string
  startTime?: string
  endTime?: string
  description?: string
}

export interface CreateRoomRequest {
  name: string
//   description: string
  capacity: number
  location: string
//   facilities: string[]
}

export interface UpdateRoomRequest {
  name?: string
  description?: string
  capacity?: number
  location?: string
  facilities?: string[]
}

export interface AuthResponse {
  user: User
  token: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface BookingFilters extends PaginationParams {
  dateFrom?: string
  dateTo?: string
  status?: Booking['status']
  roomId?: string
  search?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
