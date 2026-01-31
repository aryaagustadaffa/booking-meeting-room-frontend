'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion, HTMLMotionProps } from 'framer-motion'

export interface MTableProps extends React.HTMLAttributes<HTMLTableElement> {
  variant?: 'elevated' | 'outlined' | 'plain'
  stickyHeader?: boolean
}

const MTable = React.forwardRef<HTMLTableElement, MTableProps>(
  ({ className, variant = 'elevated', stickyHeader = false, children, ...props }, ref) => {
    const variantStyles = {
      elevated: 'elevation-1 rounded-xl overflow-hidden',
      outlined: 'border border-outline rounded-xl overflow-hidden',
      plain: '',
    }
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <table
          ref={ref}
          className={cn('w-full text-left text-body-medium', variantStyles[variant], className)}
          {...props}
        >
          {children}
        </table>
      </motion.div>
    )
  }
)
MTable.displayName = 'MTable'

export interface MTableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  sticky?: boolean
}

const MTableHeader = React.forwardRef<HTMLTableSectionElement, MTableHeaderProps>(
  ({ className, sticky = false, children, ...props }, ref) => {
    const stickyStyles = sticky ? 'sticky top-0 z-10' : ''
    
    return (
      <thead
        ref={ref}
        className={cn(
          'bg-surface-container text-on-surface-variant',
          stickyStyles,
          className
        )}
        {...props}
      >
        {children}
      </thead>
    )
  }
)
MTableHeader.displayName = 'MTableHeader'

export type MTableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>

const MTableBody = React.forwardRef<HTMLTableSectionElement, MTableBodyProps>(
  ({ className, children, ...props }, ref) => (
    <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props}>
      {children}
    </tbody>
  )
)
MTableBody.displayName = 'MTableBody'

export type MTableFooterProps = React.HTMLAttributes<HTMLTableSectionElement>

const MTableFooter = React.forwardRef<HTMLTableSectionElement, MTableFooterProps>(
  ({ className, children, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn('bg-surface-container-low text-muted-foreground', className)}
      {...props}
    >
      {children}
    </tfoot>
  )
)
MTableFooter.displayName = 'MTableFooter'

export interface MTableRowProps extends HTMLMotionProps<"tr"> {
  hover?: boolean
}

const MTableRow = React.forwardRef<HTMLTableRowElement, MTableRowProps>(
  ({ className, hover = true, children, ...props }, ref) => {
    const hoverStyles = hover ? 'hover:bg-surface-container-low transition-colors' : ''
    
    return (
      <motion.tr
        ref={ref}
        className={cn(
          'border-b border-outline/50 data-[state=selected]:bg-surface-container-high',
          hoverStyles,
          className
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {children}
      </motion.tr>
    )
  }
)
MTableRow.displayName = 'MTableRow'

export type MTableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement>

const MTableHead = React.forwardRef<HTMLTableCellElement, MTableHeadProps>(
  ({ className, children, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'h-12 px-4 text-left align-middle font-medium text-label-medium [&:has([role=checkbox])]:pr-0',
        className
      )}
      {...props}
    >
      {children}
    </th>
  )
)
MTableHead.displayName = 'MTableHead'

export type MTableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>

const MTableCell = React.forwardRef<HTMLTableCellElement, MTableCellProps>(
  ({ className, children, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        'p-4 align-middle [&:has([role=checkbox])]:pr-0',
        className
      )}
      {...props}
    >
      {children}
    </td>
  )
)
MTableCell.displayName = 'MTableCell'

export type MTableCaptionProps = React.HTMLAttributes<HTMLTableCaptionElement>

const MTableCaption = React.forwardRef<HTMLTableCaptionElement, MTableCaptionProps>(
  ({ className, children, ...props }, ref) => (
    <caption
      ref={ref}
      className={cn('mt-4 text-body-small text-muted-foreground', className)}
      {...props}
    >
      {children}
    </caption>
  )
)
MTableCaption.displayName = 'MTableCaption'

export {
  MTable,
  MTableHeader,
  MTableBody,
  MTableFooter,
  MTableRow,
  MTableHead,
  MTableCell,
  MTableCaption,
}
