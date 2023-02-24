import React from 'react';
import Message from './message.component';
import useMessageStore from '../../../store/message.store';

export default function Messages() {
  const messages = useMessageStore((state) => state.messages);

  if (messages.length) {
    return (
      <div className="h-1/4 overflow-auto">
        {messages.map((m) => (
          <Message key={m.id} message={m} />
        ))}
      </div>
    );
  } else {
    return <div></div>;
  }
}
