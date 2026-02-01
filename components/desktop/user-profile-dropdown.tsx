'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { CompactAvatar } from './compact-avatar'
import { AccountMenu } from './account-menu'
import { motion } from 'framer-motion'

export interface UserProfileDropdownProps {
  userName?: string
  userEmail?: string
  userRole?: string
  onLogout: () => void
  isExpanded?: boolean
  className?: string
}

export function UserProfileDropdown({
  userName,
  userEmail,
  userRole,
  onLogout,
  isExpanded = true,
  className
}: UserProfileDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200',
            'hover:bg-muted/50 active:scale-[0.98]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            !isExpanded && 'justify-center px-2',
            className
          )}
        >
          {/* Avatar */}
          <CompactAvatar
            name={userName}
            email={userEmail}
            size="md"
            showGlow={isOpen}
          />

          {/* User Info - Only show when expanded */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="flex flex-1 flex-col items-start gap-0.5 overflow-hidden"
            >
              <span className="text-sm font-semibold text-foreground whitespace-nowrap">
                {userName || 'User'}
              </span>
              {userEmail && (
                <span className="text-xs text-muted-foreground/80 line-clamp-1 whitespace-nowrap">
                  {userEmail}
                </span>
              )}
            </motion.div>
          )}

          {/* Dropdown Arrow - Only show when expanded */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-muted-foreground transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
              />
            </motion.div>
          )}
        </button>
      </DropdownMenuTrigger>

      <AccountMenu
        userName={userName}
        userEmail={userEmail}
        userRole={userRole}
        onLogout={onLogout}
      />
    </DropdownMenu>
  )
}
