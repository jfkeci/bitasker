import React from 'react';
import NavLink from './nav-link.component';

export default function NavLinks() {
  return (
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <NavLink href="/logout" text="Encoder" active={false} />
        <NavLink href="/logout" text="Profile" active={false} />
        <NavLink href="/login" text="Login" active={false} />
        <NavLink href="/register" text="Register" active={false} />
      </ul>
    </div>
  );
}
