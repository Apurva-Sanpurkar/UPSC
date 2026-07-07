import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { StudySession, ContentItem, Task, Streak, Settings, TopicStatus, Subject } from './types';

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
        if (pin === 'ILoveyouSai') {
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
  toggleSession: (session: StudySession) => void;
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
      toggleSession: (session) =>
        set((state) => {
          const exists = state.sessions.some((s) => s.id === session.id);
          if (exists) {
            return {
              sessions: state.sessions.map((s) =>
                s.id === session.id
                  ? {
                      ...s,
                      status: s.status === 'done' ? 'pending' : 'done',
                      actualMinutes: s.status === 'done' ? 0 : s.plannedMinutes,
                    }
                  : s
              ),
            };
          } else {
            const newStatus = session.status === 'done' ? 'pending' : 'done';
            return {
              sessions: [
                ...state.sessions,
                {
                  ...session,
                  status: newStatus,
                  actualMinutes: newStatus === 'done' ? session.plannedMinutes : 0,
                },
              ],
            };
          }
        }),
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
        upsc: { category: 'upsc', currentStreak: 0, longestStreak: 0, lastCompletedDate: '2026-07-07' },
        academic: { category: 'academic', currentStreak: 0, longestStreak: 0, lastCompletedDate: '2026-07-07' },
        content: { category: 'content', currentStreak: 0, longestStreak: 0, lastCompletedDate: '2026-07-07' },
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
        travelMinutesEachWay: 120,
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

const defaultAISubjects: Subject[] = [
  { id: 'ai', type: 'academic', name: 'Artificial Intelligence', examDate: '2026-11-17', totalUnits: 5 },
  { id: 'ml', type: 'academic', name: 'Machine Learning', examDate: '2026-11-19', totalUnits: 5 },
  { id: 'iot', type: 'academic', name: 'Internet of Things (IoT)', examDate: '2026-11-24', totalUnits: 5 },
  { id: 'sp', type: 'academic', name: 'Statistical & System Programming', examDate: '2026-11-26', totalUnits: 5 },
  { id: 'dt', type: 'academic', name: 'Design Thinking', examDate: '2026-11-28', totalUnits: 5 },
];

const defaultAIUnits: Record<string, { unitNumber: number; title: string; topics: string[] }[]> = {
  ai: [
    { unitNumber: 1, title: 'Introduction to AI & Problem Solving', topics: ['Intelligent Agents', 'State Space Search', 'BFS & DFS', 'A* Search', 'Heuristic Functions'] },
    { unitNumber: 2, title: 'Knowledge Representation & Logic', topics: ['Propositional Logic', 'First-Order Logic', 'Inference Rules', 'Resolution', 'Ontologies'] },
    { unitNumber: 3, title: 'Probabilistic Reasoning & Bayes', topics: ['Uncertainty', 'Bayesian Networks', 'Markov Models', 'Hidden Markov Models', 'Decision Trees'] },
    { unitNumber: 4, title: 'Natural Language Processing & Vision', topics: ['Syntax & Semantics', 'Language Models', 'Image Processing Basics', 'Object Detection', 'Feature Extraction'] },
    { unitNumber: 5, title: 'AI Ethics, Robotics & Future Trends', topics: ['Ethical AI', 'Bias & Fairness', 'Robotics Kinematics', 'Reinforcement Learning Basics', 'AGI Concepts'] },
  ],
  ml: [
    { unitNumber: 1, title: 'Supervised Learning & Regression', topics: ['Linear Regression', 'Logistic Regression', 'Gradient Descent', 'Bias-Variance Tradeoff', 'Regularization'] },
    { unitNumber: 2, title: 'Classification Algorithms', topics: ['k-Nearest Neighbors', 'Support Vector Machines', 'Decision Trees', 'Random Forests', 'Ensemble Methods'] },
    { unitNumber: 3, title: 'Unsupervised Learning & Clustering', topics: ['k-Means Clustering', 'Hierarchical Clustering', 'DBSCAN', 'PCA & Dimensionality Reduction', 'Anomalies'] },
    { unitNumber: 4, title: 'Neural Networks & Deep Learning', topics: ['Perceptrons', 'Multi-Layer Perceptron', 'Backpropagation', 'Activation Functions', 'CNNs & RNNs Basics'] },
    { unitNumber: 5, title: 'Model Evaluation & Optimization', topics: ['Cross-Validation', 'ROC & AUC', 'Hyperparameter Tuning', 'Grid Search', 'Deployment Basics'] },
  ],
  iot: [
    { unitNumber: 1, title: 'IoT Architecture & Protocols', topics: ['IoT Ecosystem', 'Sensors & Actuators', 'MQTT, CoAP, HTTP', 'Zigbee & LoRaWAN', 'Edge Computing'] },
    { unitNumber: 2, title: 'Embedded Systems & Microcontrollers', topics: ['Arduino & Raspberry Pi', 'GPIO Programming', 'Serial Communication', 'ADC/DAC', 'RTOS Basics'] },
    { unitNumber: 3, title: 'IoT Connectivity & Networking', topics: ['Wireless Sensor Networks', 'IPv6 & 6LoWPAN', 'Bluetooth Low Energy', 'Cellular IoT (NB-IoT)', 'Gateway Design'] },
    { unitNumber: 4, title: 'Cloud Analytics & IoT Data', topics: ['Cloud Platforms (AWS/Azure IoT)', 'Data Ingestion', 'Time-Series Databases', 'Stream Processing', 'Visualization'] },
    { unitNumber: 5, title: 'IoT Security & Privacy', topics: ['Device Authentication', 'Encryption in IoT', 'Vulnerabilities & Attacks', 'Secure Boot', 'Privacy Regulations'] },
  ],
  sp: [
    { unitNumber: 1, title: 'Statistical Foundations for Computing', topics: ['Probability Distributions', 'Hypothesis Testing', 'ANOVA', 'Correlation & Covariance', 'Sampling Methods'] },
    { unitNumber: 2, title: 'R & Python Statistical Programming', topics: ['Data Frames & Series', 'Pandas & NumPy', 'Data Wrangling', 'Statistical Visualization', 'Seaborn & ggplot'] },
    { unitNumber: 3, title: 'System Programming & OS Interfaces', topics: ['System Calls', 'Process Control & Forking', 'Inter-Process Communication', 'Signals & Pipes', 'Memory Management'] },
    { unitNumber: 4, title: 'Multithreading & Concurrency', topics: ['POSIX Threads', 'Mutex & Semaphores', 'Deadlock Prevention', 'Asynchronous Programming', 'Event Loops'] },
    { unitNumber: 5, title: 'File Systems & Network Programming', topics: ['File I/O Operations', 'Socket Programming', 'TCP/UDP Sockets', 'Client-Server Architecture', 'Performance Profiling'] },
  ],
  dt: [
    { unitNumber: 1, title: 'Introduction to Design Thinking', topics: ['Human-Centered Design', 'Empathy & User Research', 'Design Thinking Frameworks', 'Problem Framing', 'Mindset'] },
    { unitNumber: 2, title: 'Empathize & Define Phases', topics: ['User Interviews', 'Empathy Maps', 'Personas', 'Customer Journey Mapping', 'Point of View (POV) Statements'] },
    { unitNumber: 3, title: 'Ideation Techniques', topics: ['Brainstorming & Brainwriting', 'SCAMPER Technique', 'Mind Mapping', 'Crazy Eights', 'Selecting & Clustering Ideas'] },
    { unitNumber: 4, title: 'Prototyping & Wireframing', topics: ['Low-Fidelity vs High-Fidelity', 'Paper Prototyping', 'Figma Wireframing', 'Interactive Mockups', 'Rapid Prototyping'] },
    { unitNumber: 5, title: 'Testing & Iteration', topics: ['Usability Testing', 'Feedback Capture Grids', 'Iterative Refinement', 'Storytelling & Pitching', 'Case Studies'] },
  ],
};

interface AcademicState {
  subjects: Subject[];
  units: Record<string, { unitNumber: number; title: string; topics: string[] }[]>;
  unitProgress: Record<string, Record<number, boolean>>;
  toggleUnit: (subjectId: string, unitNumber: number) => void;
  addSubject: (subj: Subject) => void;
  removeSubject: (id: string) => void;
  addUnit: (subjectId: string, title: string, topics: string[]) => void;
  removeUnit: (subjectId: string, unitNumber: number) => void;
  resetToDefault: () => void;
}

export const useAcademics = create<AcademicState>()(
  persist(
    (set, get) => ({
      subjects: defaultAISubjects,
      units: defaultAIUnits,
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
      addSubject: (subj) =>
        set((state) => ({
          subjects: [...state.subjects, subj],
          units: { ...state.units, [subj.id]: [] },
        })),
      removeSubject: (id) =>
        set((state) => {
          const newSubj = state.subjects.filter((s) => s.id !== id);
          const newUnits = { ...state.units };
          delete newUnits[id];
          const newProg = { ...state.unitProgress };
          delete newProg[id];
          return { subjects: newSubj, units: newUnits, unitProgress: newProg };
        }),
      addUnit: (subjectId, title, topics) =>
        set((state) => {
          const currentUnits = state.units[subjectId] || [];
          const nextUnitNum = currentUnits.length > 0 ? Math.max(...currentUnits.map((u) => u.unitNumber)) + 1 : 1;
          return {
            units: {
              ...state.units,
              [subjectId]: [...currentUnits, { unitNumber: nextUnitNum, title, topics }],
            },
          };
        }),
      removeUnit: (subjectId, unitNumber) =>
        set((state) => {
          const currentUnits = state.units[subjectId] || [];
          return {
            units: {
              ...state.units,
              [subjectId]: currentUnits.filter((u) => u.unitNumber !== unitNumber),
            },
          };
        }),
      resetToDefault: () =>
        set({
          subjects: defaultAISubjects,
          units: defaultAIUnits,
          unitProgress: {},
        }),
    }),
    {
      name: 'mission2027-academics',
      onRehydrateStorage: () => (state) => {
        if (state && (!state.subjects || state.subjects.length === 0 || state.subjects.some(s => ['toc', 'cn', 'daa', 'fm'].includes(s.id)))) {
          state.subjects = defaultAISubjects;
          state.units = defaultAIUnits;
          state.unitProgress = {};
        }
      },
    }
  )
);

export type ActivityStage = 'planned' | 'in_progress' | 'completed';
export type ActivityCategory = 'Club & College' | 'Coding & Tech' | 'Fitness & Health' | 'Hobbies & Art' | 'Personal Growth' | 'Outings & Fun';

export interface ExtraActivityItem {
  id: string;
  title: string;
  category: ActivityCategory;
  priority: 'low' | 'medium' | 'high';
  stage: ActivityStage;
  deadline?: string;
  notes?: string;
  createdAt: string;
}

export interface GrowthHabit {
  id: string;
  title: string;
  completedToday: boolean;
}

interface ActivitiesState {
  activities: ExtraActivityItem[];
  habits: GrowthHabit[];
  addActivity: (act: ExtraActivityItem) => void;
  updateActivityStage: (id: string, stage: ActivityStage) => void;
  removeActivity: (id: string) => void;
  addHabit: (title: string) => void;
  toggleHabit: (id: string) => void;
  removeHabit: (id: string) => void;
}

const defaultActivities: ExtraActivityItem[] = [
  { id: 'act-1', title: 'AI/ML Club Hackathon Preparation', category: 'Coding & Tech', priority: 'high', stage: 'in_progress', deadline: '2026-07-20', createdAt: '2026-07-07' },
  { id: 'act-2', title: 'Read 2 chapters of Atomic Habits', category: 'Personal Growth', priority: 'medium', stage: 'planned', deadline: '2026-07-15', createdAt: '2026-07-07' },
  { id: 'act-3', title: 'VIT Kondhwa Fest Committee Meeting', category: 'Club & College', priority: 'high', stage: 'planned', deadline: '2026-07-12', createdAt: '2026-07-07' },
  { id: 'act-4', title: 'Weekend Outing & Cafe Brunch with Friends', category: 'Outings & Fun', priority: 'low', stage: 'planned', deadline: '2026-07-18', createdAt: '2026-07-07' },
  { id: 'act-5', title: 'Evening Yoga & 5km Walk', category: 'Fitness & Health', priority: 'medium', stage: 'completed', deadline: '2026-07-07', createdAt: '2026-07-07' },
];

const defaultHabits: GrowthHabit[] = [
  { id: 'hab-1', title: '🎧 Audiobook / Podcast during 4hr Bus Commute', completedToday: false },
  { id: 'hab-2', title: '💧 Drink 2.5 Liters of Water', completedToday: true },
  { id: 'hab-3', title: '💻 30 mins Coding Practice (Python/AI)', completedToday: false },
  { id: 'hab-4', title: '🧘‍♀️ 10 mins Meditation or Skincare Routine', completedToday: true },
  { id: 'hab-5', title: '📖 Read 15 mins before bed', completedToday: false },
];

export const useActivities = create<ActivitiesState>()(
  persist(
    (set) => ({
      activities: defaultActivities,
      habits: defaultHabits,
      addActivity: (act) => set((state) => ({ activities: [act, ...state.activities] })),
      updateActivityStage: (id, stage) =>
        set((state) => ({
          activities: state.activities.map((a) => (a.id === id ? { ...a, stage } : a)),
        })),
      removeActivity: (id) =>
        set((state) => ({
          activities: state.activities.filter((a) => a.id !== id),
        })),
      addHabit: (title) =>
        set((state) => ({
          habits: [...state.habits, { id: 'hab-' + Date.now(), title, completedToday: false }],
        })),
      toggleHabit: (id) =>
        set((state) => ({
          habits: state.habits.map((h) => (h.id === id ? { ...h, completedToday: !h.completedToday } : h)),
        })),
      removeHabit: (id) =>
        set((state) => ({
          habits: state.habits.filter((h) => h.id !== id),
        })),
    }),
    { name: 'mission2027-activities' }
  )
);
