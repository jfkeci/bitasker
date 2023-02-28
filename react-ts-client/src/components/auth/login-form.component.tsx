import * as Joi from 'joi';
import React, { useState } from 'react';
import { User } from '../../models/user.model';
import useAuthStore from '../../store/auth.store';
import AppFormInputComponent from '../input/app-form-input.component';
import { LoginUserAttribtues } from '../../services/auth.service';
import useMessageStore, { AppMessage } from '../../store/message.store';

export default function LoginForm() {
  const addMessage = useMessageStore((state) => state.addMessage);
  const login = useAuthStore((state) => state.login);

  const [loginData, setLoginData] = useState({
    email: 'tester1@test.com',
    password: 'Test@1234',
  } as LoginUserAttribtues);

  const loginUser = async () => {
    const result: User | AppMessage[] = await login(loginData);

    if (Array.isArray(result)) {
      // Response returned a list of errors
      for (const message of result) {
        addMessage(message);
      }
    }

    window.location.href = 'http://localhost:3000/encoder';
  };

  return (
    <div>
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          loginUser();
        }}
      >
        <AppFormInputComponent
          config={{
            type: 'email',
            property: 'email',
            label: 'Email',
            placeholder: 'you@mail.com',
            validationSchema: Joi.string().min(5).max(125).required(),
            value: loginData.email,
            onUpdate: (newValue) => {
              setLoginData((prevData) => ({
                ...prevData,
                email: newValue,
              }));
            },
          }}
        />
        <AppFormInputComponent
          config={{
            type: 'password',
            property: 'password',
            label: 'Password',
            placeholder: '********',
            validationSchema: Joi.string().min(8).max(255).required(),
            value: loginData.password,
            onUpdate: (newValue) => {
              setLoginData((prevData) => ({
                ...prevData,
                password: newValue,
              }));
            },
          }}
        />

        <button
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => loginUser()}
        >
          Login
        </button>
      </form>
    </div>
  );
}
