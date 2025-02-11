import React from 'react';
import { Switch } from '@headlessui/react';
import { cn } from '../../../utils/cn';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  className = '',
}) => {
  return (
    <Switch.Group as="div" className={cn('flex items-start', className)}>
      <Switch
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={cn(
          checked ? 'bg-indigo-600' : 'bg-gray-200',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            checked ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
          )}
        />
      </Switch>
      {(label || description) && (
        <div className="ml-3">
          {label && (
            <Switch.Label as="span" className="text-sm font-medium text-gray-900">
              {label}
            </Switch.Label>
          )}
          {description && (
            <Switch.Description as="span" className="text-sm text-gray-500">
              {description}
            </Switch.Description>
          )}
        </div>
      )}
    </Switch.Group>
  );
}; 