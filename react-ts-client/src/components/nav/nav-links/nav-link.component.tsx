import React from 'react';

interface NavLinkProps {
  text: string;
  href: string;
  active: boolean;
}

export default function NavLink(props: NavLinkProps) {
  if (props.active) {
    return (
      <a
        href={props.href}
        className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
        aria-current="page"
      >
        {props.text}
      </a>
    );
  } else {
    return (
      <div>
        <li>
          <a
            href={props.href}
            className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            {props.text}
          </a>
        </li>
      </div>
    );
  }
}
