import { pgTable, uuid, text, date, time, timestamp, integer, boolean, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  dob: date('dob').notNull(),
  upscAttemptYear: integer('upsc_attempt_year').notNull(),
  prelimsDate: date('prelims_date').notNull(),
  mainsDate: date('mains_date').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const settings = pgTable('settings', {
  userId: uuid('user_id').references(() => users.id).notNull(),
  wakeTime: time('wake_time').notNull(),
  sleepTime: time('sleep_time').notNull(),
  travelMinutesEachWay: integer('travel_minutes_each_way').default(60).notNull(),
  optionalSubjectName: text('optional_subject_name').notNull(),
  notifEmail: boolean('notif_email').default(false).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const subjects = pgTable('subjects', {
  id: uuid('id').primaryKey().defaultRandom(),
  type: text('type').notNull(), // 'academic','upsc_gs','upsc_optional','content'
  name: text('name').notNull(),
  examDate: date('exam_date'),
  totalUnits: integer('total_units'),
});

export const microTopics = pgTable('micro_topics', {
  id: uuid('id').primaryKey().defaultRandom(),
  subjectId: uuid('subject_id').references(() => subjects.id).notNull(),
  dayNumber: integer('day_number').notNull(),
  title: text('title').notNull(),
  subtopics: jsonb('subtopics').$type<string[]>().notNull(),
  resources: jsonb('resources').$type<string[]>().notNull(),
  plannedDate: date('planned_date').notNull(),
  status: text('status').notNull(), // 'pending','done','missed','rescheduled'
  completedAt: timestamp('completed_at', { withTimezone: true }),
});

export const timetableSlots = pgTable('timetable_slots', {
  id: uuid('id').primaryKey().defaultRandom(),
  dayOfWeek: text('day_of_week').notNull(),
  startTime: time('start_time').notNull(),
  endTime: time('end_time').notNull(),
  slotType: text('slot_type').notNull(), // 'class','free','lunch'
  label: text('label').notNull(),
});

export const dailyTemplateBlocks = pgTable('daily_template_blocks', {
  id: uuid('id').primaryKey().defaultRandom(),
  templateName: text('template_name').notNull(), // 'default','exam_sprint'
  dayType: text('day_type').notNull(), // 'weekday','saturday','sunday'
  startTime: time('start_time').notNull(),
  endTime: time('end_time').notNull(),
  category: text('category').notNull(),
  label: text('label').notNull(),
  sortOrder: integer('sort_order').notNull(),
});

export const studySessions = pgTable('study_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  date: date('date').notNull(),
  blockLabel: text('block_label').notNull(),
  category: text('category').notNull(),
  subjectId: uuid('subject_id').references(() => subjects.id),
  plannedMinutes: integer('planned_minutes').notNull(),
  actualMinutes: integer('actual_minutes').default(0).notNull(),
  status: text('status').notNull(), // 'pending','done','missed','rescheduled'
  notes: text('notes'),
  startTime: time('start_time'),
  endTime: time('end_time'),
});

export const contentCalendar = pgTable('content_calendar', {
  id: uuid('id').primaryKey().defaultRandom(),
  date: date('date').notNull(),
  contentType: text('content_type').notNull(), // 'reel','short','long_video'
  title: text('title').notNull(),
  stage: text('stage').notNull(), // 'idea','scripted','shot','edited','published'
  platform: text('platform').notNull(),
  publishAt: timestamp('publish_at', { withTimezone: true }),
});

export const tasks = pgTable('tasks', {
  id: uuid('id').primaryKey().defaultRandom(),
  date: date('date').notNull(),
  title: text('title').notNull(),
  category: text('category').notNull(),
  status: text('status').notNull(), // 'pending','done'
  priority: text('priority').notNull(),
  deadline: timestamp('deadline'),
});

export const streaks = pgTable('streaks', {
  id: uuid('id').primaryKey().defaultRandom(),
  category: text('category').notNull(),
  currentStreak: integer('current_streak').default(0).notNull(),
  longestStreak: integer('longest_streak').default(0).notNull(),
  lastCompletedDate: date('last_completed_date'),
});

export const auditLog = pgTable('audit_log', {
  id: uuid('id').primaryKey().defaultRandom(),
  entityId: uuid('entity_id'),
  action: text('action').notNull(),
  originalDate: date('original_date'),
  newDate: date('new_date'),
  reason: text('reason'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
