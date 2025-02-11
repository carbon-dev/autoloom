import React from 'react';
import { cn } from '../../../utils/cn';

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  className?: string;
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
  emptyState?: React.ReactNode;
}

export function Table<T>({
  columns,
  data,
  keyExtractor,
  className = '',
  onRowClick,
  isLoading = false,
  emptyState,
}: TableProps<T>) {
  if (isLoading) {
    return (
      <div className="min-w-full divide-y divide-gray-300">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-100" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-50" />
          ))}
        </div>
      </div>
    );
  }

  if (data.length === 0 && emptyState) {
    return <>{emptyState}</>;
  }

  return (
    <div className={cn('overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg', className)}>
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={cn(
                  'py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900',
                  column.className
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((item) => (
            <tr
              key={keyExtractor(item)}
              onClick={onRowClick ? () => onRowClick(item) : undefined}
              className={cn(onRowClick && 'cursor-pointer hover:bg-gray-50')}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn(
                    'whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500',
                    column.className
                  )}
                >
                  {column.render
                    ? column.render(item)
                    // @ts-ignore - We assume the key exists on the item
                    : item[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 