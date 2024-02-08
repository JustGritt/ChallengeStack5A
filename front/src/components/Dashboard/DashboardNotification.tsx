import React, { Fragment } from "react";
import { User } from "@/types/User";
import { classNames } from "@/lib/helpers/utils";
import { userNavigation } from "@/lib/constants/navigation";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, UserIcon } from "@heroicons/react/20/solid";

function DashboardNotification(user: User) {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="-m-1.5 flex items-center p-1.5">
        <span className="sr-only">Open user menu</span>
        <UserIcon className="h-6 w-6" aria-hidden="true" />
        <span className="hidden lg:flex lg:items-center">
          <span
            className="ml-4 text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300"
            aria-hidden="true"
          >
            {user.firstname}
          </span>
          <ChevronDownIcon
            className="ml-2 h-5 w-5 text-gray-400 dark:text-gray-300"
            aria-hidden="true"
          />
        </span>
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
        <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white dark:bg-gray-800 py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
          {userNavigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <a
                  href={item.href}
                  className={classNames(
                    active ? "bg-gray-50 dark:bg-gray-700" : "",
                    "block px-3 py-1 text-sm leading-6 text-gray-900 dark:text-gray-300"
                  )}
                >
                  {item.name}
                </a>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default DashboardNotification;
