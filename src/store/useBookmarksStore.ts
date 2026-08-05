import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BookmarksState {
  bookmarkedLessonIds: string[];
  toggleBookmark: (lessonId: string) => void;
  isBookmarked: (lessonId: string) => boolean;
}

export const useBookmarksStore = create<BookmarksState>()(
  persist(
    (set, get) => ({
      bookmarkedLessonIds: [],
      toggleBookmark: (lessonId) =>
        set((state) => {
          const isCurrentlyBookmarked = state.bookmarkedLessonIds.includes(lessonId);
          if (isCurrentlyBookmarked) {
            return {
              bookmarkedLessonIds: state.bookmarkedLessonIds.filter((id) => id !== lessonId),
            };
          } else {
            return {
              bookmarkedLessonIds: [...state.bookmarkedLessonIds, lessonId],
            };
          }
        }),
      isBookmarked: (lessonId) => get().bookmarkedLessonIds.includes(lessonId),
    }),
    {
      name: 'yencoo-bookmarks-storage',
    }
  )
);
