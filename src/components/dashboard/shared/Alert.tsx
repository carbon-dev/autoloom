import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  children,
  onClose,
  className = '',
}) => {
  const styles = {
    info: {
      bg: 'bg-blue-50',
      icon: Info,
      iconColor: 'text-blue-400',
      titleColor: 'text-blue-800',
      textColor: 'text-blue-700',
    },
    success: {
      bg: 'bg-green-50',
      icon: CheckCircle,
      iconColor: 'text-green-400',
      titleColor: 'text-green-800',
      textColor: 'text-green-700',
    },
    warning: {
      bg: 'bg-yellow-50',
      icon: AlertCircle,
      iconColor: 'text-yellow-400',
      titleColor: 'text-yellow-800',
      textColor: 'text-yellow-700',
    },
    error: {
      bg: 'bg-red-50',
      icon: XCircle,
      iconColor: 'text-red-400',
      titleColor: 'text-red-800',
      textColor: 'text-red-700',
    },
  };

  const style = styles[type];
  const Icon = style.icon;

  return (
    <div className={cn('rounded-md p-4', style.bg, className)}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={cn('h-5 w-5', style.iconColor)} aria-hidden="true" />
        </div>
        <div className="ml-3">
          {title && (
            <h3 className={cn('text-sm font-medium', style.titleColor)}>
              {title}
            </h3>
          )}
          <div className={cn('text-sm', style.textColor)}>{children}</div>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onClose}
                className={cn(
                  'inline-flex rounded-md p-1.5',
                  style.bg,
                  style.textColor,
                  'hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2',
                  `focus:ring-${type}-500`
                )}
              >
                <span className="sr-only">Dismiss</span>
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 