'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDate, formatTime } from '@/lib/utils'
import { bookingService } from '@/services/booking.service'
import { roomService } from '@/services/room.service'
import type { Booking, Room } from '@/types'
import { useQuery } from '@tanstack/react-query'
import {
    AlertCircle,
    ArrowRight,
    Building2,
    Calendar,
    CheckCircle2,
    Clock,
    RefreshCw,
    Users
} from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboardPage() {
  const { data: bookingsData, isLoading: bookingsLoading, refetch } = useQuery({
    queryKey: ['pending-bookings-dashboard'],
    queryFn: () => bookingService.getPendingBookings(),
  })

  const { data: roomsData, isLoading: roomsLoading } = useQuery({
    queryKey: ['rooms-dashboard'],
    queryFn: () => roomService.getRooms(),
  })

  const pendingBookings = bookingsData?.data?.data || []
  const rooms = roomsData?.data || []

  const stats = {
    pending: pendingBookings.length,
    rooms: rooms.length,
    totalCapacity: rooms.reduce((sum: number, room: Room) => sum + room.capacity, 0),
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of booking requests and room management
          </p>
        </div>
        <Button variant="outline" onClick={() => refetch()}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting your approval
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
            <Building2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rooms}</div>
            <p className="text-xs text-muted-foreground">
              Available meeting rooms
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCapacity}</div>
            <p className="text-xs text-muted-foreground">
              Combined room capacity
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Bookings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Pending Booking Requests</CardTitle>
          <Link href="/admin/bookings">
            <Button variant="outline" size="sm">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {bookingsLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between space-x-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                  <Skeleton className="h-8 w-20" />
                </div>
              ))}
            </div>
          ) : pendingBookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle2 className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-2">No pending bookings</p>
              <p className="text-sm text-muted-foreground">
                All booking requests have been processed
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingBookings.slice(0, 5).map((booking: Booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between rounded-lg border p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{booking.user?.name || 'Unknown User'}</p>
                      <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                        Pending
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {booking.room?.name || 'Unknown Room'} • {formatDate(booking.date)}
                    </p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                    </div>
                  </div>
                  <Link href={`/admin/bookings`}>
                    <Button variant="outline" size="sm">
                      Review
                    </Button>
                  </Link>
                </div>
              ))}
              {pendingBookings.length > 5 && (
                <Link href="/admin/bookings">
                  <Button variant="outline" className="w-full">
                    View {pendingBookings.length - 5} more pending bookings
                  </Button>
                </Link>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/admin/bookings" className="block">
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Manage Bookings
              </Button>
            </Link>
            <Link href="/admin/rooms" className="block">
              <Button className="w-full justify-start" variant="outline">
                <Building2 className="mr-2 h-4 w-4" />
                Manage Rooms
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Room Overview</CardTitle>
          </CardHeader>
          <CardContent>
            {roomsLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : rooms.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground mb-4">No rooms configured</p>
                <Link href="/admin/rooms">
                  <Button size="sm">Add First Room</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {rooms.slice(0, 3).map((room: Room) => (
                  <div key={room.id} className="flex items-center justify-between text-sm">
                    <span className="font-medium">{room.name}</span>
                    <span className="text-muted-foreground">{room.capacity} seats</span>
                  </div>
                ))}
                {rooms.length > 3 && (
                  <Link href="/admin/rooms" className="block mt-2">
                    <Button variant="outline" size="sm" className="w-full">
                      View All {rooms.length} Rooms
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
