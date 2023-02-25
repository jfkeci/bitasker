import * as Joi from 'joi';
import React, { useState } from 'react';

interface AuthFormInputComponentProps {
  type?: 'text' | 'email' | 'password';
  label?: string;
  value: string;
  placeholder?: string;
  property: string;
  onUpdate: (newValue: string) => void;
  validationSchema: Joi.Schema;
}

export default function AuthFormInputComponent(props: {
  config: AuthFormInputComponentProps;
}) {
  const [validationError, setValidationError] = useState('');

  const validate = (value: string) => {
    const { error } = props.config.validationSchema.validate(value);

    setValidationError(
      error
        ? error.details[0].message.replace(
            '"value"',
            props.config.label ?? props.config.property,
          )
        : '',
    );
  };

  return (
    <div>
      <div className="mb-6">
        <div>
          <label
            className={
              validationError
                ? 'block mb-2 text-sm font-medium text-red-700 dark:text-red-500'
                : 'block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            }
          >
            {props.config.label ?? ''}
          </label>
          <input
            id={`auth-input-${props.config.property}`}
            type={props.config.type ?? 'text'}
            className={
              validationError
                ? 'bg-red-50 border border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-red-500'
                : 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
            }
            value={props.config.value}
            placeholder={props.config.placeholder}
            onChange={(e) => {
              validate(e.target.value);
              props.config.onUpdate(e.target.value);
            }}
            required
          />
          {validationError ? (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {validationError}
            </p>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
}
