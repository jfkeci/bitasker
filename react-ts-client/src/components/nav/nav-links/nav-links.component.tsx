import React from 'react';
import NavLink from './nav-link.component';

import useAuthStore from '../../../store/auth.store';

export default function NavLinks() {
  const logout = useAuthStore((state) => state.logout);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const logoutUser = () => {
    logout();

    window.location.href = 'http://localhost:3000/login';
  };

  return (
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        {isLoggedIn() ? (
          <NavLink
            href="/encoder"
            text="Encoder"
            active={window.location.pathname.includes('encoder')}
          />
        ) : (
          <NavLink
            href="/login"
            text="Login"
            active={window.location.pathname.includes('login')}
          />
        )}

        {isLoggedIn() ? (
          <></>
        ) : (
          <NavLink
            href="/register"
            text="Register"
            active={window.location.pathname.includes('register')}
          />
        )}

        {isLoggedIn() ? (
          <li>
            <button
              className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              onClick={() => logoutUser()}
            >
              Logout
            </button>
          </li>
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
}
