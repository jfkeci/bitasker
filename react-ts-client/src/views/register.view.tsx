import React from 'react';
import useAuthStore from '../store/auth.store';
import AuthorizedComponent from '../components/auth/authorized.component';
import RegistrationForm from '../components/auth/registration-form.component';

export default function RegisterView() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (isLoggedIn()) {
    return <AuthorizedComponent />;
  } else {
    return (
      <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="space-y-6">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Platform registration
          </h5>

          <RegistrationForm />

          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Already have an account? {'  '}
            <a
              href="/login"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    );
  }
}
