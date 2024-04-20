'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Bars3Icon,
  XMarkIcon,
  ArrowRightEndOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

import Logo from '../../public/logo.png';

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Users', href: '/users' },
  { name: 'Recommended Funds', href: '/recommended-funds' },
  {
    name: 'Subscriptions',
    href: '/subscriptions',
  },
  { name: 'Mandate', href: '/mandate' },
  { name: 'Investments', href: '/investments' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Sidebar = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div>
        {/* //* Desktop Nav */}
        <div className="hidden border lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-52 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
            <div className="flex items-center">
              <Image
                className="p-2"
                src={Logo}
                priority
                alt="Truemind Dashboard"
              />
            </div>
            <hr />
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => {
                      const isActive = item.href === pathname;
                      return (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={classNames(
                              isActive
                                ? 'bg-nav-active text-white'
                                : 'text-nav-text hover:text-on-hover hover:bg-nav-hover',
                              'group flex gap-x-3 rounded-md p-2 text-xs leading-6',
                            )}
                          >
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>

                <li className="mt-auto">
                  <Link
                    href="#"
                    className="group -mx-2 flex justify-end gap-x-3 rounded-md p-2 bg-nav-active text-sm font-semibold leading-6 text-white hover:bg-nav-hover hover:text-on-hover"
                  >
                    <span>Logout</span>
                    <ArrowRightEndOnRectangleIcon
                      className="h-6 w-6 shrink-0 text-white group-hover:text-white"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* //* Mobile Nav */}
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                    <div className="flex justify-center">
                      <Image src={Logo} priority alt="Truemind Dashboard" />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => {
                              const isActive = item.href === pathname;

                              return (
                                <li key={item.name}>
                                  <Link
                                    href={item.href}
                                    className={classNames(
                                      isActive
                                        ? 'bg-nav-active text-white'
                                        : 'text-nav-text hover:text-on-hover hover:bg-nav-hover',
                                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6',
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </li>

                        <li className="mt-auto">
                          <Link
                            href="/"
                            className="group -mx-2 flex justify-end gap-x-3 rounded-md bg-nav-active p-2 text-sm font-semibold leading-6 text-white hover:bg-nav-hover hover:text-on-hover"
                          >
                            <span>Logout</span>
                            <ArrowRightEndOnRectangleIcon
                              className="h-6 w-6 shrink-0 text-white group-hover:text-white"
                              aria-hidden="true"
                            />
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* //* Main Content */}
        <div className="lg:pl-52">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <main className="py-4">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
