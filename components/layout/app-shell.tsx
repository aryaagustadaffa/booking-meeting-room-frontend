'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MButton } from '@/components/material/m-button'
import { MBadge } from '@/components/material/m-badge'
import {
  LayoutDashboard,
  Calendar,
  Users,
  Settings,
  LogOut,
  User,
  Bell,
  Menu,
  Home,
  Building2,
  FileText,
  ChevronRight,
} from 'lucide-react'
import { getInitials } from '@/lib/utils'
import { motion } from 'framer-motion'

export interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string | number
  description?: string
}

interface AppShellProps {
  navigation: NavItem[]
  userName?: string
  userEmail?: string
  userRole?: string
  onLogout: () => void
  logo?: React.ReactNode
  children: React.ReactNode
  notificationCount?: number
}

export function AppShell({
  navigation,
  userName,
  userEmail,
  userRole,
  onLogout,
  logo,
  children,
  notificationCount = 0,
}: AppShellProps) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)
  
  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Floating Sidebar */}
      <aside
        className={cn(
          'fixed left-4 top-4 bottom-4 z-40 hidden w-64 rounded-2xl glass elevation-3 transition-all duration-300 lg:flex',
          isSidebarOpen ? 'w-72' : 'w-64'
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-outline/50 px-4">
          {logo || (
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <span className="text-sm font-bold">MR</span>
              </div>
              <span className="text-title-medium font-semibold">Meeting Room</span>
            </Link>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navigation.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-label-medium transition-all duration-200',
                  active
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-surface-container-low hover:text-foreground'
                )}
              >
                <item.icon
                  className={cn(
                    'h-5 w-5 transition-colors',
                    active ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                  )}
                />
                <div className="flex flex-1 flex-col">
                  <span className="font-medium">{item.name}</span>
                  {item.description && (
                    <span className="text-body-small text-muted-foreground">
                      {item.description}
                    </span>
                  )}
                </div>
                {item.badge && (
                  <MBadge variant={active ? 'primary' : 'surface'} size="sm">
                    {item.badge}
                  </MBadge>
                )}
                {active && <ChevronRight className="h-4 w-4 text-primary" />}
              </Link>
            )
          })}
        </nav>

        {/* User Info */}
        <div className="border-t border-outline/50 p-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-surface-container-low">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary text-primary-foreground text-label-medium">
                    {userName ? getInitials(userName) : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-col items-start gap-0.5">
                  <span className="text-label-medium font-medium">
                    {userName || 'User'}
                  </span>
                  {userEmail && (
                    <span className="text-body-small text-muted-foreground line-clamp-1">
                      {userEmail}
                    </span>
                  )}
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                {userRole && (
                  <Badge variant="outline" className="mb-2">
                    {userRole}
                  </Badge>
                )}
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex cursor-pointer items-center">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex cursor-pointer items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={onLogout}
                className="text-destructive cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-outline/50 bg-background/80 px-4 backdrop-blur-lg lg:hidden">
        <div className="flex items-center gap-3">
          <MButton
            variant="text"
            size="icon"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </MButton>
          {logo || (
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <span className="text-sm font-bold">MR</span>
              </div>
              <span className="text-title-medium font-semibold">Meeting Room</span>
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2">
          <MButton
            variant="text"
            size="icon"
            className="relative"
            aria-label={`Notifications${notificationCount > 0 ? ` (${notificationCount} unread)` : ''}`}
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <MBadge
                variant="error"
                size="sm"
                className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center"
              >
                {notificationCount > 9 ? '9+' : notificationCount}
              </MBadge>
            )}
          </MButton>
          <ThemeToggle />
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-outline/50 bg-background/80 backdrop-blur-lg lg:hidden">
        <div className="flex justify-around">
          {navigation.slice(0, 5).map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-1 flex-col items-center gap-1 px-3 py-2 transition-colors"
              >
                <item.icon
                  className={cn(
                    'h-5 w-5 transition-colors',
                    active ? 'text-primary' : 'text-muted-foreground'
                  )}
                />
                <span
                  className={cn(
                    'text-label-small',
                    active ? 'text-primary font-medium' : 'text-muted-foreground'
                  )}
                >
                  {item.name}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <motion.aside
        initial={{ x: '-100%' }}
        animate={{ x: isMobileMenuOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed left-0 top-0 bottom-0 z-50 w-72 bg-surface lg:hidden"
      >
        <div className="flex h-16 items-center justify-between border-b border-outline/50 px-4">
          {logo || (
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <span className="text-sm font-bold">MR</span>
              </div>
              <span className="text-title-medium font-semibold">Meeting Room</span>
            </Link>
          )}
          <MButton
            variant="text"
            size="icon"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <Menu className="h-5 w-5" />
          </MButton>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navigation.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-label-medium transition-all duration-200',
                  active
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-surface-container-low hover:text-foreground'
                )}
              >
                <item.icon
                  className={cn(
                    'h-5 w-5 transition-colors',
                    active ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                  )}
                />
                <div className="flex flex-1 flex-col">
                  <span className="font-medium">{item.name}</span>
                  {item.description && (
                    <span className="text-body-small text-muted-foreground">
                      {item.description}
                    </span>
                  )}
                </div>
                {item.badge && (
                  <MBadge variant={active ? 'primary' : 'surface'} size="sm">
                    {item.badge}
                  </MBadge>
                )}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-outline/50 p-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-surface-container-low">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary text-primary-foreground text-label-medium">
                    {userName ? getInitials(userName) : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-col items-start gap-0.5">
                  <span className="text-label-medium font-medium">
                    {userName || 'User'}
                  </span>
                  {userEmail && (
                    <span className="text-body-small text-muted-foreground line-clamp-1">
                      {userEmail}
                    </span>
                  )}
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                {userRole && (
                  <Badge variant="outline" className="mb-2">
                    {userRole}
                  </Badge>
                )}
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex cursor-pointer items-center">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex cursor-pointer items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={onLogout}
                className="text-destructive cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className={cn('min-h-screen', 'lg:pl-72', 'pb-16 lg:pb-0')}>
        {/* Glassmorphism Header for Desktop */}
        <header className="sticky top-0 z-20 hidden h-16 items-center justify-between border-b border-outline/50 bg-background/80 px-6 backdrop-blur-lg lg:flex">
          <div className="flex items-center gap-4">
            <h1 className="text-headline-small font-semibold">
              {navigation.find((item) => isActive(item.href))?.name || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <MButton
              variant="text"
              size="icon"
              className="relative"
              aria-label={`Notifications${notificationCount > 0 ? ` (${notificationCount} unread)` : ''}`}
            >
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <MBadge
                  variant="error"
                  size="sm"
                  className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center"
                >
                  {notificationCount > 9 ? '9+' : notificationCount}
                </MBadge>
              )}
            </MButton>
            <ThemeToggle />
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
