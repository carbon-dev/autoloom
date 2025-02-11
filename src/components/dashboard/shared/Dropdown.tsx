import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface DropdownItem {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  align = 'right',
  className = '',
}) => {
  return (
    <Menu as="div" className={cn('relative inline-block text-left', className)}>
      <Menu.Button className="inline-flex items-center">
        {trigger}
        <ChevronDown className="ml-2 h-4 w-4" aria-hidden="true" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={cn(
            'absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
            align === 'left' ? 'left-0' : 'right-0'
          )}
        >
          <div className="py-1">
            {items.map((item, index) => (
              <Menu.Item key={index} disabled={item.disabled}>
                {({ active }) => (
                  <button
                    onClick={item.onClick}
                    className={cn(
                      'flex w-full items-center px-4 py-2 text-sm',
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      item.disabled && 'opacity-50 cursor-not-allowed'
                    )}
                    disabled={item.disabled}
                  >
                    {item.icon && (
                      <span className="mr-3 h-5 w-5 text-gray-400">
                        {item.icon}
                      </span>
                    )}
                    {item.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}; 