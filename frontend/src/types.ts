// ========== TYPES ==========

export interface UserProfile {
  name: string;
  dob: string;
  upscAttemptYear: number;
  prelimsDate: string;
  mainsDate: string;
  optionalSubject: string;
  pin: string;
}

export interface Settings {
  wakeTime: string;
  sleepTime: string;
  travelMinutesEachWay: number;
  optionalSubjectName: string;
  notifEmail: boolean;
}

export type SubjectType = 'academic' | 'upsc_gs' | 'upsc_optional' | 'content';

export interface Subject {
  id: string;
  type: SubjectType;
  name: string;
  examDate: string | null;
  totalUnits: number | null;
}

export type TopicStatus = 'pending' | 'done' | 'missed' | 'rescheduled';

export interface MicroTopic {
  id: string;
  subjectId: string;
  dayNumber: number;
  title: string;
  subtopics: string[];
  resources: string[];
  plannedDate: string;
  status: TopicStatus;
  completedAt: string | null;
}

export interface TimetableSlot {
  id: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  slotType: 'class' | 'free' | 'lunch';
  label: string;
}

export type TemplateType = 'default' | 'exam_sprint';
export type DayType = 'weekday' | 'saturday' | 'sunday';
export type BlockCategory = 'upsc' | 'academic' | 'content' | 'travel' | 'routine' | 'college' | 'meal' | 'review' | 'sleep' | 'rest';

export interface TemplateBlock {
  id: string;
  templateName: TemplateType;
  dayType: DayType;
  startTime: string;
  endTime: string;
  category: BlockCategory;
  label: string;
  sortOrder: number;
}

export type SessionStatus = 'pending' | 'done' | 'missed' | 'rescheduled';

export interface StudySession {
  id: string;
  date: string;
  blockLabel: string;
  subjectId: string | null;
  category: BlockCategory;
  plannedMinutes: number;
  actualMinutes: number;
  status: SessionStatus;
  notes: string;
  startTime: string;
  endTime: string;
}

export type ContentType = 'reel' | 'short' | 'long_video';
export type ContentStage = 'idea' | 'scripted' | 'shot' | 'edited' | 'published';

export interface ContentItem {
  id: string;
  date: string;
  contentType: ContentType;
  title: string;
  stage: ContentStage;
  platform: string;
  publishAt: string | null;
}

export interface Task {
  id: string;
  date: string;
  title: string;
  category: string;
  status: 'pending' | 'done';
  priority: 'low' | 'medium' | 'high';
  deadline?: string;
}

export interface Streak {
  category: string;
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate: string;
}

export interface AuditEntry {
  id: string;
  entityId: string;
  action: string;
  originalDate: string;
  newDate: string;
  reason: string;
  createdAt: string;
}

export interface UPSCPhase {
  phase: number;
  calendarWindow: string;
  morningSubject: string;
  eveningSubject: string;
  microPlannerDays: string;
  notes: string;
  startDate: string;
  endDate: string;
}

export interface AcademicUnit {
  subjectId: string;
  unitNumber: number;
  title: string;
  completed: boolean;
  topics: string[];
}

export interface SprintWeek {
  week: number;
  dates: string;
  focus: string;
  startDate: string;
  endDate: string;
}
