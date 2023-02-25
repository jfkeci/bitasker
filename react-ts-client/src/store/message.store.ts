import { create } from 'zustand';

interface NewMessage {
  title: string;
  body?: string | null;
  type?: 'error' | 'success' | 'warning';
}

export interface AppMessage {
  id: number;
  title: string;
  body?: string | null;
  type?: 'error' | 'success' | 'warning';
}

interface MessageStore {
  messages: AppMessage[];
  addMessage: (message: NewMessage) => void;
  removeMessage: (id: number) => void;
  clearMessages: () => void;
}

const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  addMessage: (message: NewMessage) => {
    set((state) => {
      const id = state.messages.length
        ? Math.max(...(<number[]>state.messages.map((m) => m.id))) + 1
        : 1;

      setTimeout(() => {
        state.removeMessage(id);
      }, 5000);

      return {
        messages: [
          ...state.messages,
          { id, ...message, type: message.type ?? 'success' },
        ],
      };
    });
  },
  removeMessage: (id: number) =>
    set((state) => ({ messages: state.messages.filter((m) => m.id !== id) })),
  clearMessages: () => set((state) => ({ messages: [] })),
}));

export default useMessageStore;
