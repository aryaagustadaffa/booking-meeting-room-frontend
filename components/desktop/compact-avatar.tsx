'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { getInitials } from '@/lib/utils'

interface CompactAvatarProps {
  name?: string
  email?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showGlow?: boolean
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-9 w-9',
  lg: 'h-10 w-10'
}

const textSizes = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-sm'
}

export type { CompactAvatarProps }

export function CompactAvatar({
  name,
  email,
  size = 'md',
  className,
  showGlow = false
}: CompactAvatarProps) {
  const initials = name ? getInitials(name) : 'U'

  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      <AvatarFallback
        className={cn(
          'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold',
          textSizes[size],
          showGlow && 'ring-2 ring-primary/20 ring-offset-2 ring-offset-background'
        )}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  )
}
