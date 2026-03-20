import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ChatOpenState = {
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
};

const useChatOpenStore = create<ChatOpenState>()(
  persist(
    (set) => ({
      chatOpen: false,
      setChatOpen: (open) => set({ chatOpen: open }),
    }),
    {
      name: 'chat-open-storage',
    }
  )
);

export default useChatOpenStore;
