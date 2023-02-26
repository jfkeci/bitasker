import React from 'react';
import LoginForm from '../components/auth/login-form.component';

export default function LoginView() {
  return (
    <div>
      <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" action="#">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign in to our platform
          </h5>

          <LoginForm />

          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            You do not have an account?{'  '}
            <a
              href="/register"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
