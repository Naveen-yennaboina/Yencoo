import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Note {
  lessonId: string;
  content: string;
  updatedAt: string;
}

interface NotesState {
  notes: Record<string, Note>;
  saveNote: (lessonId: string, content: string) => void;
  getNote: (lessonId: string) => Note | undefined;
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: {},
      saveNote: (lessonId, content) =>
        set((state) => ({
          notes: {
            ...state.notes,
            [lessonId]: {
              lessonId,
              content,
              updatedAt: new Date().toISOString(),
            },
          },
        })),
      getNote: (lessonId) => get().notes[lessonId],
    }),
    {
      name: 'yencoo-notes-storage',
    }
  )
);
