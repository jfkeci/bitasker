import * as Joi from 'joi';
import React, { useState } from 'react';
import { User } from '../../models/user.model';
import useAuthStore from '../../store/auth.store';
import AppFormInputComponent from '../input/app-form-input.component';
import { RegisterUserAttributes } from '../../services/auth.service';
import useMessageStore, { AppMessage } from '../../store/message.store';

export default function RegistrationForm() {
  const addMessage = useMessageStore((state) => state.addMessage);
  const register = useAuthStore((state) => state.register);

  const [registrationData, setRegistrationData] = useState({
    firstName: 'Jakov',
    lastName: 'Sabolicek',
    email: 'jakov@filpip.com',
    password: 'Test@1234',
    confirmPassword: 'Test@1234',
  } as RegisterUserAttributes);

  const registerUser = async () => {
    if (registrationData.password !== registrationData.confirmPassword) {
      addMessage({ title: 'Passwords should match', type: 'error' });
      return;
    }

    const result: User | AppMessage[] = await register(registrationData);

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
        onSubmit={(e) => {
          e.preventDefault();
          registerUser();
        }}
      >
        <AppFormInputComponent
          config={{
            property: 'firstName',
            label: 'First name',
            placeholder: 'Your first name',
            value: registrationData.firstName,
            validationSchema: Joi.string()
              .alphanum()
              .min(3)
              .max(125)
              .required(),
            onUpdate: (newValue) => {
              setRegistrationData((prevData) => ({
                ...prevData,
                firstName: newValue,
              }));
            },
          }}
        />
        <AppFormInputComponent
          config={{
            property: 'lastName',
            label: 'Last Name',
            placeholder: 'Your last name',
            value: registrationData.lastName,
            validationSchema: Joi.string()
              .alphanum()
              .min(3)
              .max(125)
              .required(),
            onUpdate: (newValue) => {
              setRegistrationData((prevData) => ({
                ...prevData,
                lastName: newValue,
              }));
            },
          }}
        />
        <AppFormInputComponent
          config={{
            type: 'email',
            property: 'email',
            label: 'Email',
            placeholder: 'you@mail.com',
            validationSchema: Joi.string().min(5).max(125).required(),
            value: registrationData.email,
            onUpdate: (newValue) => {
              setRegistrationData((prevData) => ({
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
            customValidationMessage:
              'Password requires at least one upper case letter, one lower case letter, one number and one special character',
            validationSchema: Joi.string()
              .pattern(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
              )
              .min(8)
              .max(255)
              .required(),
            value: registrationData.password,
            onUpdate: (newValue) => {
              setRegistrationData((prevData) => ({
                ...prevData,
                password: newValue,
              }));
            },
          }}
        />
        <AppFormInputComponent
          config={{
            type: 'password',
            property: 'confirmPassword',
            label: 'Confirm password',
            placeholder: '********',
            validationSchema: Joi.string().min(8).max(255).required(),
            value: registrationData.confirmPassword,
            onUpdate: (newValue) => {
              setRegistrationData((prevData) => ({
                ...prevData,
                confirmPassword: newValue,
              }));
            },
          }}
        />

        <button
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => registerUser()}
        >
          Register
        </button>
      </form>
    </div>
  );
}
