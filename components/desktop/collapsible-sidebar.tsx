'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SidebarBrandHeader } from './sidebar-brand-header'
import { UserProfileDropdown } from './user-profile-dropdown'

export interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string | number
  description?: string
}

interface CollapsibleSidebarProps {
  navigation: NavItem[]
  userName?: string
  userEmail?: string
  userRole?: string
  onLogout: () => void
  logo?: React.ReactNode
  defaultExpanded?: boolean
  className?: string
}

export function CollapsibleSidebar({
  navigation,
  userName,
  userEmail,
  userRole,
  onLogout,
  logo,
  defaultExpanded = true,
  className,
}: CollapsibleSidebarProps) {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded)
  
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)
  
  const sidebarWidth = isExpanded ? 'min-w-sidebar-expanded w-[280px]' : 'min-w-sidebar-compact w-[72px]'
  
  return (
    <aside
      className={cn(
        'sticky top-4 z-30 hidden rounded-2xl bg-card shadow-lg border border-border/50 transition-all duration-300 ease-saas lg:flex flex-col h-[calc(100vh-2rem)]',
        sidebarWidth,
        'hover:shadow-xl',
        className
      )}
    >
      {/* Brand Header */}
      <SidebarBrandHeader
        isExpanded={isExpanded}
        logo={logo}
      />

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {navigation.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                active
                  ? 'bg-primary/10 text-primary shadow-sm'
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
                !isExpanded && 'justify-center px-0'
              )}
              title={!isExpanded ? item.name : undefined}
            >
              <item.icon
                className={cn(
                  'h-5 w-5 flex-shrink-0 transition-colors',
                  active ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                )}
              />
              <AnimatePresence mode="wait">
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="flex flex-1 flex-col overflow-hidden"
                  >
                    <span className="font-medium whitespace-nowrap">{item.name}</span>
                    {item.description && (
                      <span className="text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              {isExpanded && item.badge && (
                <Badge
                  variant={active ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {item.badge}
                </Badge>
              )}
              {isExpanded && active && (
                <ChevronRight className="h-4 w-4 text-primary ml-auto" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Collapse Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute right-0 top-1/2 -translate-y-1/2 flex h-6 w-3 translate-x-1/2 items-center justify-center rounded-full bg-card border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors shadow-sm"
        aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        <ChevronRight
          className={cn(
            'h-3 w-3 transition-transform duration-200',
            !isExpanded && 'rotate-180'
          )}
        />
      </button>

      {/* User Profile */}
      <div className="border-t border-border/50 p-3">
        <UserProfileDropdown
          userName={userName}
          userEmail={userEmail}
          userRole={userRole}
          onLogout={onLogout}
          isExpanded={isExpanded}
        />
      </div>
    </aside>
  )
}
