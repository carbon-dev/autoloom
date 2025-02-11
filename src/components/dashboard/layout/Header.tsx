import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Menu as MenuIcon } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { useAuthStore } from '../../../store/useAuthStore';
import { Button } from '../shared/Button';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow">
      <div className="flex h-16 items-center gap-x-4 border-b border-gray-200 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <MenuIcon className="h-6 w-6" />
        </Button>

        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <div className="flex flex-1" />
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <Menu as="div" className="relative">
              <Menu.Button className="-m-1.5 flex items-center p-1.5">
                <span className="sr-only">Open user menu</span>
                <div className="flex items-center gap-x-3">
                  <div className="h-8 w-8 rounded-full bg-gray-100" />
                  <span className="hidden lg:flex lg:items-center">
                    <span className="text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                      {user?.email}
                    </span>
                    <ChevronDown className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </div>
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
                <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={cn(
                          active ? 'bg-gray-50' : '',
                          'block w-full px-3 py-1 text-sm leading-6 text-gray-900 text-left'
                        )}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
}; 