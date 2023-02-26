import React from 'react';

export default function AuthorizedComponent() {
  return (
    <div>
      <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="space-y-6">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            You are logged in
          </h5>

          <div className="mt-5">
            <a
              href="/encoder"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Go to the Encoder
            </a>
          </div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            You want to login with a diferent accout? {'  '}
            <a
              href="/logout"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
