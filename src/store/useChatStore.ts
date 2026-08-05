import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatState {
  chatHistory: Record<string, ChatMessage[]>;
  addMessage: (lessonId: string, message: ChatMessage) => void;
  getHistory: (lessonId: string) => ChatMessage[];
  clearHistory: (lessonId: string) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      chatHistory: {},
      addMessage: (lessonId, message) =>
        set((state) => {
          const currentHistory = state.chatHistory[lessonId] || [];
          return {
            chatHistory: {
              ...state.chatHistory,
              [lessonId]: [...currentHistory, message],
            },
          };
        }),
      getHistory: (lessonId) => get().chatHistory[lessonId] || [],
      clearHistory: (lessonId) =>
        set((state) => ({
          chatHistory: {
            ...state.chatHistory,
            [lessonId]: [],
          },
        })),
    }),
    {
      name: 'yencoo-chat-storage',
    }
  )
);
