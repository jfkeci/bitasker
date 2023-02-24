import React from 'react';
import NavTitle from './nav-title.component';
import NavButton from './nav-button.component';
import NavLinks from './nav-links/nav-links.component';

function Nav() {
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <NavTitle />
        <NavButton />
        <NavLinks />
      </div>
    </nav>
  );
}

export default Nav;
