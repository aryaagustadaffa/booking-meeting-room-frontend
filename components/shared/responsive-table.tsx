'use client'

import * as React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

export interface Column<T> {
  key: string
  header: string
  className?: string
  cellClassName?: string
  render?: (row: T, index: number) => React.ReactNode
}

interface ResponsiveTableProps<T> {
  data: T[]
  columns: Column<T>[]
  emptyMessage?: React.ReactNode
  className?: string
  rowClassName?: string | ((row: T, index: number) => string)
  onRowClick?: (row: T, index: number) => void
  isLoading?: boolean
  skeletonRows?: number
}

export function ResponsiveTable<T>({
  data,
  columns,
  emptyMessage = <p className="text-center text-muted-foreground">No data available</p>,
  className,
  rowClassName,
  onRowClick,
  isLoading = false,
  skeletonRows = 5,
}: ResponsiveTableProps<T>) {
  const getRowClassName = (row: T, index: number) => {
    if (typeof rowClassName === 'function') {
      return rowClassName(row, index)
    }
    return rowClassName || ''
  }

  if (isLoading) {
    return (
      <div className={cn('w-full', className)}>
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.key} className={column.className}>
                    {column.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: skeletonRows }).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      <div className="h-4 w-full animate-pulse rounded bg-muted" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="space-y-3 md:hidden">
          {Array.from({ length: skeletonRows }).map((_, index) => (
            <div
              key={index}
              className="rounded-lg border bg-card p-4 shadow-sm"
            >
              <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
              <div className="mt-2 space-y-2">
                {columns.map((column) => (
                  <div key={column.key} className="h-3 w-full animate-pulse rounded bg-muted" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className={cn('flex min-h-[200px] items-center justify-center', className)}>
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className={cn('w-full', className)}>
      {/* Desktop Table View */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key} className={column.className}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={index}
                className={cn(
                  'transition-colors hover:bg-muted/50',
                  onRowClick && 'cursor-pointer',
                  getRowClassName(row, index)
                )}
                onClick={() => onRowClick?.(row, index)}
              >
                {columns.map((column) => (
                  <TableCell key={column.key} className={column.cellClassName}>
                    {column.render ? column.render(row, index) : (row as Record<string, unknown>)[column.key] as React.ReactNode}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="space-y-3 md:hidden">
        {data.map((row, index) => (
          <div
            key={index}
            className={cn(
              'overflow-hidden rounded-lg border bg-card p-4 shadow-sm transition-shadow hover:shadow-md',
              onRowClick && 'cursor-pointer',
              getRowClassName(row, index)
            )}
            onClick={() => onRowClick?.(row, index)}
            role={onRowClick ? 'button' : undefined}
            tabIndex={onRowClick ? 0 : undefined}
            onKeyDown={(e) => {
              if (onRowClick && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault()
                onRowClick(row, index)
              }
            }}
          >
            {columns.map((column, colIndex) => (
              <div
                key={column.key}
                className={cn(
                  colIndex === 0 ? 'mb-3' : 'mb-2',
                  colIndex === columns.length - 1 && 'mb-0'
                )}
              >
                <div className="text-xs font-medium text-muted-foreground">
                  {column.header}
                </div>
                <div className={cn('text-sm', column.cellClassName)}>
                  {column.render ? column.render(row, index) : (row as Record<string, unknown>)[column.key] as React.ReactNode}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
