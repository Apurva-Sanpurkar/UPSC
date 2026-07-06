import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { StudySession, ContentItem, Task, Streak, Settings, TopicStatus } from './types';

interface AuthState {
  isAuthenticated: boolean;
  login: (pin: string) => boolean;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: (pin: string) => {
        if (pin === '2413') {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false }),
    }),
    { name: 'mission2027-auth' }
  )
);

interface SessionsState {
  sessions: StudySession[];
  setSessions: (s: StudySession[]) => void;
  updateSession: (id: string, updates: Partial<StudySession>) => void;
  addSession: (s: StudySession) => void;
}

export const useSessions = create<SessionsState>()(
  persist(
    (set) => ({
      sessions: [],
      setSessions: (sessions) => set({ sessions }),
      updateSession: (id, updates) =>
        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.id === id ? { ...s, ...updates } : s
          ),
        })),
      addSession: (s) => set((state) => ({ sessions: [...state.sessions, s] })),
    }),
    { name: 'mission2027-sessions' }
  )
);

interface TopicState {
  topicStatuses: Record<string, TopicStatus>;
  setTopicStatus: (id: string, status: TopicStatus) => void;
}

export const useTopics = create<TopicState>()(
  persist(
    (set) => ({
      topicStatuses: {},
      setTopicStatus: (id, status) =>
        set((state) => ({
          topicStatuses: { ...state.topicStatuses, [id]: status },
        })),
    }),
    { name: 'mission2027-topics' }
  )
);

interface ContentState {
  items: ContentItem[];
  setItems: (items: ContentItem[]) => void;
  updateItem: (id: string, updates: Partial<ContentItem>) => void;
  addItem: (item: ContentItem) => void;
}

export const useContent = create<ContentState>()(
  persist(
    (set) => ({
      items: [],
      setItems: (items) => set({ items }),
      updateItem: (id, updates) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, ...updates } : i
          ),
        })),
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
    }),
    { name: 'mission2027-content' }
  )
);

interface NotesState {
  note: string;
  setNote: (note: string) => void;
}

export const useNotes = create<NotesState>()(
  persist(
    (set) => ({
      note: '',
      setNote: (note) => set({ note }),
    }),
    { name: 'mission2027-notes' }
  )
);

interface TaskState {
  tasks: Task[];
  addTask: (t: Task) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
}

export const useTasks = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (t) => set((state) => ({ tasks: [...state.tasks, t] })),
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id
              ? { ...t, status: t.status === 'done' ? 'pending' : 'done' }
              : t
          ),
        })),
      removeTask: (id) =>
        set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),
    }),
    { name: 'mission2027-tasks' }
  )
);

interface StreakState {
  streaks: Record<string, Streak>;
  updateStreak: (category: string, streak: Streak) => void;
}

export const useStreaks = create<StreakState>()(
  persist(
    (set) => ({
      streaks: {
        upsc: { category: 'upsc', currentStreak: 0, longestStreak: 0, lastCompletedDate: '' },
        academic: { category: 'academic', currentStreak: 0, longestStreak: 0, lastCompletedDate: '' },
        content: { category: 'content', currentStreak: 0, longestStreak: 0, lastCompletedDate: '' },
      },
      updateStreak: (category, streak) =>
        set((state) => ({
          streaks: { ...state.streaks, [category]: streak },
        })),
    }),
    { name: 'mission2027-streaks' }
  )
);

interface SettingsState {
  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => void;
  prelimsDate: string;
  mainsDate: string;
  setPrelimsDate: (d: string) => void;
  setMainsDate: (d: string) => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      settings: {
        wakeTime: '05:00',
        sleepTime: '22:45',
        travelMinutesEachWay: 60,
        optionalSubjectName: 'Public Administration',
        notifEmail: false,
      },
      prelimsDate: '2027-05-23',
      mainsDate: '2027-08-20',
      updateSettings: (updates) =>
        set((state) => ({
          settings: { ...state.settings, ...updates },
        })),
      setPrelimsDate: (d) => set({ prelimsDate: d }),
      setMainsDate: (d) => set({ mainsDate: d }),
    }),
    { name: 'mission2027-settings' }
  )
);

interface AcademicState {
  unitProgress: Record<string, Record<number, boolean>>;
  toggleUnit: (subjectId: string, unitNumber: number) => void;
}

export const useAcademics = create<AcademicState>()(
  persist(
    (set) => ({
      unitProgress: {},
      toggleUnit: (subjectId, unitNumber) =>
        set((state) => {
          const subj = state.unitProgress[subjectId] || {};
          return {
            unitProgress: {
              ...state.unitProgress,
              [subjectId]: { ...subj, [unitNumber]: !subj[unitNumber] },
            },
          };
        }),
    }),
    { name: 'mission2027-academics' }
  )
);
