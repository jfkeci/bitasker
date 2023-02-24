import React from 'react';

export default function NavTitle() {
  return (
    <div>
      <a href="https://flowbite.com/" className="flex items-center">
        <img
          src="https://ui-avatars.com/api/?name=String+Encoder?rounded=true"
          className="h-6 mr-3 sm:h-9"
          alt="String encoder Logo"
        />
        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
          String encoder
        </span>
      </a>
    </div>
  );
}
