import * as Joi from 'joi';
import React, { useState } from 'react';
import AppFormInputComponent from '../components/input/app-form-input.component';
import { EncoderData, encodeString } from '../services/encoder.service';
import useAuthStore from '../store/auth.store';
import useMessageStore from '../store/message.store';
import { handleNetworkError } from '../utils/handle-network-error.util';

export default function EncoderView() {
  const [encoderResult, setEncoderResult] = useState('');
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const addMessage = useMessageStore((state) => state.addMessage);

  const [dataToEncode, setDataToEncode] = useState({
    text: 'AAAMMMKKKKKKKKK',
  } as EncoderData);

  if (!isLoggedIn()) {
    window.location.href = 'http://localhost:3000/login';
  }

  const encode = async () => {
    try {
      const result = await encodeString(dataToEncode);

      setEncoderResult(result.text);
    } catch (error: any) {
      const messages = handleNetworkError(error);

      for (const message of messages) addMessage(message);
    }
  };

  return (
    <div>
      <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="space-y-6">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Encoder
          </h5>

          <AppFormInputComponent
            config={{
              type: 'text',
              property: 'text',
              label: 'Text',
              placeholder: 'AAABBC',
              customValidationMessage: 'Text should only contain letters',
              validationSchema: Joi.string()
                .pattern(/^[a-zA-Z]+$/)
                .min(5)
                .max(125)
                .required(),
              value: dataToEncode.text,
              onUpdate: (newValue) => {
                setDataToEncode((prevData) => ({
                  ...prevData,
                  text: newValue,
                }));
              },
            }}
          />
          <div className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
            {encoderResult ? (
              <div>
                <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
                  Result
                </span>
                <span className="flex-1 ml-3 whitespace-nowrap">
                  {encoderResult}
                </span>
              </div>
            ) : (
              <span className="flex-1 ml-3 whitespace-nowrap">
                Test the encoder
              </span>
            )}
          </div>

          <div className="mt-5">
            <button
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => encode()}
            >
              Encode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
