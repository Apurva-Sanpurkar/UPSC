"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditLog = exports.streaks = exports.tasks = exports.contentCalendar = exports.studySessions = exports.dailyTemplateBlocks = exports.timetableSlots = exports.microTopics = exports.subjects = exports.settings = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    name: (0, pg_core_1.text)('name').notNull(),
    dob: (0, pg_core_1.date)('dob').notNull(),
    upscAttemptYear: (0, pg_core_1.integer)('upsc_attempt_year').notNull(),
    prelimsDate: (0, pg_core_1.date)('prelims_date').notNull(),
    mainsDate: (0, pg_core_1.date)('mains_date').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow().notNull(),
});
exports.settings = (0, pg_core_1.pgTable)('settings', {
    userId: (0, pg_core_1.uuid)('user_id').references(() => exports.users.id).notNull(),
    wakeTime: (0, pg_core_1.time)('wake_time').notNull(),
    sleepTime: (0, pg_core_1.time)('sleep_time').notNull(),
    travelMinutesEachWay: (0, pg_core_1.integer)('travel_minutes_each_way').default(60).notNull(),
    optionalSubjectName: (0, pg_core_1.text)('optional_subject_name').notNull(),
    notifEmail: (0, pg_core_1.boolean)('notif_email').default(false).notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { withTimezone: true }).defaultNow().notNull(),
});
exports.subjects = (0, pg_core_1.pgTable)('subjects', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    type: (0, pg_core_1.text)('type').notNull(), // 'academic','upsc_gs','upsc_optional','content'
    name: (0, pg_core_1.text)('name').notNull(),
    examDate: (0, pg_core_1.date)('exam_date'),
    totalUnits: (0, pg_core_1.integer)('total_units'),
});
exports.microTopics = (0, pg_core_1.pgTable)('micro_topics', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    subjectId: (0, pg_core_1.uuid)('subject_id').references(() => exports.subjects.id).notNull(),
    dayNumber: (0, pg_core_1.integer)('day_number').notNull(),
    title: (0, pg_core_1.text)('title').notNull(),
    subtopics: (0, pg_core_1.jsonb)('subtopics').$type().notNull(),
    resources: (0, pg_core_1.jsonb)('resources').$type().notNull(),
    plannedDate: (0, pg_core_1.date)('planned_date').notNull(),
    status: (0, pg_core_1.text)('status').notNull(), // 'pending','done','missed','rescheduled'
    completedAt: (0, pg_core_1.timestamp)('completed_at', { withTimezone: true }),
});
exports.timetableSlots = (0, pg_core_1.pgTable)('timetable_slots', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    dayOfWeek: (0, pg_core_1.text)('day_of_week').notNull(),
    startTime: (0, pg_core_1.time)('start_time').notNull(),
    endTime: (0, pg_core_1.time)('end_time').notNull(),
    slotType: (0, pg_core_1.text)('slot_type').notNull(), // 'class','free','lunch'
    label: (0, pg_core_1.text)('label').notNull(),
});
exports.dailyTemplateBlocks = (0, pg_core_1.pgTable)('daily_template_blocks', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    templateName: (0, pg_core_1.text)('template_name').notNull(), // 'default','exam_sprint'
    dayType: (0, pg_core_1.text)('day_type').notNull(), // 'weekday','saturday','sunday'
    startTime: (0, pg_core_1.time)('start_time').notNull(),
    endTime: (0, pg_core_1.time)('end_time').notNull(),
    category: (0, pg_core_1.text)('category').notNull(),
    label: (0, pg_core_1.text)('label').notNull(),
    sortOrder: (0, pg_core_1.integer)('sort_order').notNull(),
});
exports.studySessions = (0, pg_core_1.pgTable)('study_sessions', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    userId: (0, pg_core_1.uuid)('user_id').references(() => exports.users.id).notNull(),
    date: (0, pg_core_1.date)('date').notNull(),
    blockLabel: (0, pg_core_1.text)('block_label').notNull(),
    category: (0, pg_core_1.text)('category').notNull(),
    subjectId: (0, pg_core_1.uuid)('subject_id').references(() => exports.subjects.id),
    plannedMinutes: (0, pg_core_1.integer)('planned_minutes').notNull(),
    actualMinutes: (0, pg_core_1.integer)('actual_minutes').default(0).notNull(),
    status: (0, pg_core_1.text)('status').notNull(), // 'pending','done','missed','rescheduled'
    notes: (0, pg_core_1.text)('notes'),
    startTime: (0, pg_core_1.time)('start_time'),
    endTime: (0, pg_core_1.time)('end_time'),
});
exports.contentCalendar = (0, pg_core_1.pgTable)('content_calendar', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    date: (0, pg_core_1.date)('date').notNull(),
    contentType: (0, pg_core_1.text)('content_type').notNull(), // 'reel','short','long_video'
    title: (0, pg_core_1.text)('title').notNull(),
    stage: (0, pg_core_1.text)('stage').notNull(), // 'idea','scripted','shot','edited','published'
    platform: (0, pg_core_1.text)('platform').notNull(),
    publishAt: (0, pg_core_1.timestamp)('publish_at', { withTimezone: true }),
});
exports.tasks = (0, pg_core_1.pgTable)('tasks', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    date: (0, pg_core_1.date)('date').notNull(),
    title: (0, pg_core_1.text)('title').notNull(),
    category: (0, pg_core_1.text)('category').notNull(),
    status: (0, pg_core_1.text)('status').notNull(), // 'pending','done'
    priority: (0, pg_core_1.text)('priority').notNull(),
});
exports.streaks = (0, pg_core_1.pgTable)('streaks', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    category: (0, pg_core_1.text)('category').notNull(),
    currentStreak: (0, pg_core_1.integer)('current_streak').default(0).notNull(),
    longestStreak: (0, pg_core_1.integer)('longest_streak').default(0).notNull(),
    lastCompletedDate: (0, pg_core_1.date)('last_completed_date'),
});
exports.auditLog = (0, pg_core_1.pgTable)('audit_log', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    entityId: (0, pg_core_1.uuid)('entity_id'),
    action: (0, pg_core_1.text)('action').notNull(),
    originalDate: (0, pg_core_1.date)('original_date'),
    newDate: (0, pg_core_1.date)('new_date'),
    reason: (0, pg_core_1.text)('reason'),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow().notNull(),
});
