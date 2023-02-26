import React from 'react';
import {
  BsXSquareFill,
  BsShieldExclamation,
  BsFillInfoSquareFill,
} from 'react-icons/bs';
import useMessageStore, {
  AppMessage,
  AppMessageType,
} from '../../../store/message.store';

interface MessageComponentProps {
  key: number;
  message: AppMessage;
}

export default function Message(props: MessageComponentProps) {
  const removeMessage = useMessageStore((state) => state.removeMessage);

  const messageIconByType = (type: AppMessageType) => {
    switch (type) {
      case 'warning':
        return <BsShieldExclamation />;
      case 'error':
        return <BsShieldExclamation />;
      default:
        return <BsFillInfoSquareFill />;
    }
  };

  const messageClassByType = (type: AppMessageType): string => {
    switch (type) {
      case 'warning':
        return 'bg-orange-400 border-t-4 border-orange-500 rounded-b text-gray-600 px-4 py-3 shadow-md';
      case 'error':
        return 'bg-red-400 border-t-4 border-red-500 rounded-b text-gray-600 px-4 py-3 shadow-md';
      default:
        return 'bg-teal-400 border-t-4 border-teal-500 rounded-b text-gray-600 px-4 py-3 shadow-md';
    }
  };

  return (
    <div
      className="m-2 cursor-pointer"
      onClick={() => removeMessage(props.message.id)}
    >
      <div
        className={messageClassByType(props.message.type as AppMessageType)}
        role="alert"
      >
        <div className="flex">
          <div className="py-1">
            {messageIconByType(props.message.type as AppMessageType)}
          </div>
          <div className="ml-auto">
            <p className="font-bold">{props.message.title}</p>
            <p className="text-sm">{props.message.body ?? ''}</p>
          </div>
          <div className="py-1 ml-5 right-0">
            <BsXSquareFill />
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div id="alert-1" class="flex p-4 mb-4 text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
  <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
  <span class="sr-only">Info</span>
  <div class="ml-3 text-sm font-medium">
    A simple info alert with an <a href="#" class="font-semibold underline hover:no-underline">example link</a>. Give it a click if you like.
  </div>
    <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-1" aria-label="Close">
      <span class="sr-only">Close</span>
      <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
  </button>
</div> */
}
