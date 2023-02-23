import { create } from "zustand";

export interface MessageStore {
  message: string | null;
  type: "error" | "success" | "warning";
  isMessageVisible: boolean;
  setMessage: (message: string) => void;
  removeMessage: () => void;
}

const useMessageStore = create<MessageStore>((set, get) => ({
  message: null,
  type: "success",
  isMessageVisible: false,

  setMessage: (message: string) => set((state) => ({ message })),
  removeMessage: () => set((state) => ({ message: null })),
}));

export default useMessageStore;
