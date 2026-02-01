'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

export interface DesktopTableProps extends React.HTMLAttributes<HTMLTableElement> {
  stickyHeader?: boolean
  compact?: boolean
  hoverable?: boolean
  striped?: boolean
}

const DesktopTable = React.forwardRef<HTMLTableElement, DesktopTableProps>(
  ({ className, stickyHeader = true, compact = false, hoverable = true, striped = true, ...props }, ref) => {
    return (
      <div className="w-full overflow-hidden rounded-xl">
        <table
          ref={ref}
          className={cn(
            'w-full border-collapse',
            compact ? 'text-body-xs' : 'text-body-sm',
            className
          )}
          {...props}
        />
      </div>
    )
  }
)
DesktopTable.displayName = 'DesktopTable'

export interface DesktopTableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  sticky?: boolean
}

const DesktopTableHeader = React.forwardRef<HTMLTableSectionElement, DesktopTableHeaderProps>(
  ({ className, sticky = true, ...props }, ref) => {
    return (
      <thead
        ref={ref}
        className={cn(
          'bg-surface-container-low',
          sticky && 'sticky top-0 z-10',
          className
        )}
        {...props}
      />
    )
  }
)
DesktopTableHeader.displayName = 'DesktopTableHeader'

export interface DesktopTableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  hover?: boolean
  striped?: boolean
  index?: number
}

const DesktopTableRow = React.forwardRef<HTMLTableRowElement, DesktopTableRowProps>(
  ({ className, hover = true, striped = true, index = 0, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={cn(
          'transition-colors duration-150',
          striped && index % 2 === 0 && 'bg-surface-container-low/30',
          hover && 'hover:bg-surface-container-low hover:shadow-row-hover',
          'border-b border-subtle',
          className
        )}
        {...props}
      />
    )
  }
)
DesktopTableRow.displayName = 'DesktopTableRow'

export interface DesktopTableHeadProps extends React.HTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'center' | 'right'
}

const DesktopTableHead = React.forwardRef<HTMLTableCellElement, DesktopTableHeadProps>(
  ({ className, align = 'left', ...props }, ref) => {
    return (
      <th
        ref={ref}
        className={cn(
          'px-4 py-3 text-left text-label-md font-semibold text-muted-foreground',
          align === 'center' && 'text-center',
          align === 'right' && 'text-right',
          className
        )}
        {...props}
      />
    )
  }
)
DesktopTableHead.displayName = 'DesktopTableHead'

export interface DesktopTableCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'center' | 'right'
}

const DesktopTableCell = React.forwardRef<HTMLTableCellElement, DesktopTableCellProps>(
  ({ className, align = 'left', ...props }, ref) => {
    return (
      <td
        ref={ref}
        className={cn(
          'px-4 py-3',
          align === 'center' && 'text-center',
          align === 'right' && 'text-right',
          className
        )}
        {...props}
      />
    )
  }
)
DesktopTableCell.displayName = 'DesktopTableCell'

const DesktopTableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn('', className)} {...props} />
  )
)
DesktopTableBody.displayName = 'DesktopTableBody'

const DesktopTableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn('bg-surface-container-low border-t border-subtle', className)}
      {...props}
    />
  )
)
DesktopTableFooter.displayName = 'DesktopTableFooter'

export {
  DesktopTable,
  DesktopTableHeader,
  DesktopTableBody,
  DesktopTableFooter,
  DesktopTableRow,
  DesktopTableHead,
  DesktopTableCell,
}
