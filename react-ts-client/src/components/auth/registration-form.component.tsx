import * as Joi from 'joi';
import React, { useState } from 'react';
import { RegisterUserAttributes } from '../../services/auth.service';
import useAuthStore from '../../store/auth.store';
import useMessageStore from '../../store/message.store';
import AuthFormInputComponent from './auth-form-input.component';

export default function RegistrationForm() {
  const addMessage = useMessageStore((state) => state.addMessage);
  const register = useAuthStore((state) => state.register);

  const [registrationData, setRegistrationData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  } as RegisterUserAttributes);

  const registerUser = () => {
    if (registrationData.password !== registrationData.confirmPassword) {
      addMessage({ title: 'Passwords should match', type: 'error' });
      return;
    }

    register(registrationData);
    console.log(registrationData);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          registerUser();
        }}
      >
        <AuthFormInputComponent
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
        <AuthFormInputComponent
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
        <AuthFormInputComponent
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
        <AuthFormInputComponent
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
        <AuthFormInputComponent
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
