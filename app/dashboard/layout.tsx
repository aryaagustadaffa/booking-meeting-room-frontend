'use client'

import { AuthProvider, useAuth } from '@/hooks/use-auth'
import { AppShell } from '@/components/layout/app-shell'
import { Calendar, Home, Plus } from 'lucide-react'

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'My Bookings', href: '/dashboard/bookings', icon: Calendar },
    { name: 'New Booking', href: '/dashboard/bookings/create', icon: Plus },
  ]

  return (
    <AppShell
      navigation={navigation}
      userName={user?.name}
      userEmail={user?.email}
      userRole={user?.role}
      onLogout={logout}
    >
      {children}
    </AppShell>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </AuthProvider>
  )
}
