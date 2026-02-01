'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

export interface StickyHeaderProps {
  title?: string
  subtitle?: string
  actions?: React.ReactNode
  breadcrumbs?: React.ReactNode
  sticky?: boolean
  blur?: boolean
  className?: string
  children?: React.ReactNode
}

export function StickyHeader({
  title,
  subtitle,
  actions,
  breadcrumbs,
  sticky = true,
  blur = true,
  className,
  children,
}: StickyHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'sticky top-0 z-20 bg-background border-b border-border/50',
        sticky && 'shadow-sm',
        blur && 'bg-background/80 backdrop-blur-md',
        className
      )}
    >
      <div className="container-desktop py-4">
        {breadcrumbs && (
          <div className="mb-2">
            {breadcrumbs}
          </div>
        )}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            {title && (
              <h1 className="text-heading-xl font-semibold text-foreground">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-body-md text-muted-foreground mt-1">
                {subtitle}
              </p>
            )}
            {children}
          </div>
          {actions && (
            <div className="flex items-center gap-3 flex-shrink-0">
              {actions}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav className={cn('flex items-center gap-2 text-sm', className)} aria-label="Breadcrumb">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          )}
          {item.href ? (
            <a
              href={item.href}
              className={cn(
                'transition-colors hover:text-foreground',
                index === items.length - 1
                  ? 'text-foreground font-medium'
                  : 'text-muted-foreground'
              )}
            >
              {item.label}
            </a>
          ) : (
            <span
              className={cn(
                index === items.length - 1
                  ? 'text-foreground font-medium'
                  : 'text-muted-foreground'
              )}
            >
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}

export interface HeaderActionProps {
  children: React.ReactNode
  tooltip?: string
  className?: string
}

export function HeaderAction({ children, tooltip, className }: HeaderActionProps) {
  return (
    <div className={cn('relative group', className)}>
      {children}
      {tooltip && (
        <div className="absolute top-full right-0 mt-2 px-2 py-1 text-body-xs text-white bg-foreground rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {tooltip}
        </div>
      )}
    </div>
  )
}

export interface HeaderSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void
  placeholder?: string
}

export function HeaderSearch({ 
  onSearch, 
  placeholder = 'Search...', 
  className,
  ...props 
}: HeaderSearchProps) {
  const [value, setValue] = React.useState('')
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    onSearch?.(e.target.value)
  }
  
  return (
    <div className={cn('relative', className)}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          'w-64 pl-10 pr-4 py-2 text-body-sm bg-surface-container-low',
          'border border-subtle rounded-lg',
          'focus:outline-none focus:ring-1 focus:ring-primary/30',
          'transition-all duration-200',
          'placeholder:text-muted-foreground',
          className
        )}
        {...props}
      />
    </div>
  )
}
