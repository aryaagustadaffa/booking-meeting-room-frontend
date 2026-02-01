'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { User, Settings, LogOut } from 'lucide-react'

export interface AccountMenuProps {
  userName?: string
  userEmail?: string
  userRole?: string
  onLogout: () => void
  align?: 'start' | 'center' | 'end'
  className?: string
}

export function AccountMenu({
  userName,
  userEmail,
  userRole,
  onLogout,
  align = 'end',
  className
}: AccountMenuProps) {
  return (
    <DropdownMenuContent
      align={align}
      className={cn(
        'w-56 rounded-xl border border-border/50 bg-background/95 p-2 shadow-xl backdrop-blur-sm',
        'animate-in fade-in-0 zoom-in-95 slide-in-from-top-2',
        className
      )}
    >
      {/* User Info Header */}
      <DropdownMenuLabel className="px-3 py-2">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-foreground">
            {userName || 'User'}
          </span>
          {userEmail && (
            <span className="text-xs text-muted-foreground">
              {userEmail}
            </span>
          )}
        </div>
        {userRole && (
          <Badge variant="outline" className="mt-2 w-fit text-xs">
            {userRole}
          </Badge>
        )}
      </DropdownMenuLabel>

      <DropdownMenuSeparator className="my-1" />

      {/* Menu Items */}
      <DropdownMenuItem asChild>
        <Link
          href="/profile"
          className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted/50"
        >
          <User className="h-4 w-4 text-muted-foreground" />
          <span>Profile</span>
        </Link>
      </DropdownMenuItem>

      <DropdownMenuItem asChild>
        <Link
          href="/settings"
          className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted/50"
        >
          <Settings className="h-4 w-4 text-muted-foreground" />
          <span>Settings</span>
        </Link>
      </DropdownMenuItem>

      <DropdownMenuSeparator className="my-1" />

      <DropdownMenuItem
        onClick={onLogout}
        className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
      >
        <LogOut className="h-4 w-4" />
        <span>Logout</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  )
}
