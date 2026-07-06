import { db } from './index';
import * as schema from './schema';
import * as dotenv from 'dotenv';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid'; // need to install uuid if not present, wait let's just use crypto.randomUUID()

dotenv.config();

// Define data inline or import if we can transpile
const upscSubjects = [
  { name: 'Polity', type: 'upsc_gs' },
  { name: 'Economy & Agriculture', type: 'upsc_gs' },
  { name: 'Geography', type: 'upsc_gs' },
  { name: 'Environment + Disaster Mgmt', type: 'upsc_gs' },
  { name: 'Public Administration', type: 'upsc_optional' },
];

const academicSubjects = [
  { name: 'Theory of Computation', examDate: '2026-11-17', totalUnits: 5, type: 'academic' },
  { name: 'Computer Networks', examDate: '2026-11-19', totalUnits: 5, type: 'academic' },
  { name: 'Design & Analysis of Algorithms', examDate: '2026-11-24', totalUnits: 5, type: 'academic' },
  { name: 'Financial Mathematics', examDate: '2026-11-26', totalUnits: 5, type: 'academic' },
];

const weekdayBlocks = [
  { start: '06:00', end: '06:30', category: 'routine', label: 'Wake, freshen, water' },
  { start: '06:30', end: '07:30', category: 'upsc', label: 'UPSC Deep Study (Morning)' },
  { start: '07:30', end: '08:45', category: 'travel', label: 'Breakfast & Travel to college' },
  { start: '08:45', end: '16:20', category: 'college', label: 'College & Current Affairs' },
  { start: '16:20', end: '17:20', category: 'travel', label: 'Travel home' },
  { start: '17:20', end: '18:30', category: 'routine', label: 'Rest & Freshen' },
  { start: '18:30', end: '20:00', category: 'college', label: 'Internship (Work from home)' },
  { start: '20:00', end: '20:30', category: 'meal', label: 'Dinner' },
  { start: '20:30', end: '22:00', category: 'upsc', label: 'UPSC Deep Study (Evening)' },
  { start: '22:00', end: '23:00', category: 'academic', label: 'Academics' },
  { start: '23:00', end: '23:30', category: 'review', label: 'Review & Plan' },
];

const saturdayBlocks = [
  { start: '06:00', end: '07:30', category: 'upsc', label: 'UPSC Deep Study (Morning)' },
  { start: '07:30', end: '08:45', category: 'travel', label: 'Breakfast & Travel to college' },
  { start: '08:45', end: '16:20', category: 'college', label: 'College (Free periods)' },
  { start: '16:20', end: '17:20', category: 'travel', label: 'Travel home' },
  { start: '17:20', end: '18:00', category: 'routine', label: 'Rest' },
  { start: '18:00', end: '20:00', category: 'content', label: 'Content Creation (Scripting/Shooting)' },
  { start: '20:00', end: '20:45', category: 'meal', label: 'Dinner' },
  { start: '20:45', end: '22:30', category: 'upsc', label: 'UPSC Deep Study' },
  { start: '22:30', end: '23:30', category: 'review', label: 'Content Org & Plan' },
];

const sundayBlocks = [
  { start: '06:00', end: '09:00', category: 'upsc', label: 'UPSC Answer Writing / Optional' },
  { start: '09:00', end: '10:00', category: 'meal', label: 'Breakfast' },
  { start: '10:00', end: '13:00', category: 'content', label: 'Content Creation (Editing)' },
  { start: '13:00', end: '14:00', category: 'meal', label: 'Lunch' },
  { start: '14:00', end: '17:00', category: 'academic', label: 'Academic Deep Study' },
  { start: '17:00', end: '20:00', category: 'content', label: 'Content Publishing' },
  { start: '20:00', end: '20:45', category: 'meal', label: 'Dinner' },
  { start: '20:45', end: '22:30', category: 'review', label: 'Weekly Review' },
  { start: '22:30', end: '23:30', category: 'rest', label: 'Rest' },
];

const apurvaTimetable = [
  { dayOfWeek: 'Monday', startTime: '12:00', endTime: '14:00', slotType: 'class', label: 'SP 2305' },
  { dayOfWeek: 'Monday', startTime: '16:00', endTime: '18:00', slotType: 'class', label: 'SPL 2208A' },
  { dayOfWeek: 'Tuesday', startTime: '13:00', endTime: '14:00', slotType: 'class', label: 'SP 2306' },
  { dayOfWeek: 'Tuesday', startTime: '16:00', endTime: '17:00', slotType: 'class', label: 'IOT 2305' },
  { dayOfWeek: 'Wednesday', startTime: '16:00', endTime: '17:00', slotType: 'class', label: 'IOT 2206' },
  { dayOfWeek: 'Thursday', startTime: '12:00', endTime: '13:00', slotType: 'class', label: 'DT Tutorial Online' },
  { dayOfWeek: 'Thursday', startTime: '14:00', endTime: '16:00', slotType: 'class', label: 'AI/ML Lab B2/B1 2207/2208A' },
  { dayOfWeek: 'Thursday', startTime: '16:00', endTime: '17:00', slotType: 'class', label: 'AI 2205' },
  { dayOfWeek: 'Thursday', startTime: '17:00', endTime: '18:00', slotType: 'class', label: 'ML 2205' },
  { dayOfWeek: 'Friday', startTime: '12:00', endTime: '14:00', slotType: 'class', label: 'AI/ML Lab B1/B2 2308A/2101C' },
  { dayOfWeek: 'Friday', startTime: '14:00', endTime: '15:00', slotType: 'class', label: 'ML 2206' },
  { dayOfWeek: 'Friday', startTime: '15:00', endTime: '17:00', slotType: 'class', label: 'AI 2206' },
  { dayOfWeek: 'Friday', startTime: '17:00', endTime: '18:00', slotType: 'class', label: 'IOT 2205' },
];

async function seed() {
  console.log("Seeding database...");
  
  try {
    // Check if user exists
    const existingUsers = await db.select().from(schema.users);
    if(existingUsers.length > 0) {
      console.log("Database already seeded!");
      return;
    }

    // 1. Users
    const [user] = await db.insert(schema.users).values({
      name: 'Apurva Sanpurkar',
      dob: '2005-01-01', // Example default
      upscAttemptYear: 2027,
      prelimsDate: '2027-05-23',
      mainsDate: '2027-08-20',
    }).returning();

    // 2. Settings
    await db.insert(schema.settings).values({
      userId: user.id,
      wakeTime: '06:00',
      sleepTime: '23:30',
      travelMinutesEachWay: 60,
      optionalSubjectName: 'Public Administration',
    });

    // 3. Subjects
    for (const subj of [...upscSubjects, ...academicSubjects]) {
      await db.insert(schema.subjects).values(subj);
    }

    // 4. Daily Template Blocks
    let sort = 1;
    for (const b of weekdayBlocks) {
      await db.insert(schema.dailyTemplateBlocks).values({
        templateName: 'default', dayType: 'weekday',
        startTime: b.start, endTime: b.end,
        category: b.category, label: b.label, sortOrder: sort++
      });
    }
    
    sort = 1;
    for (const b of saturdayBlocks) {
      await db.insert(schema.dailyTemplateBlocks).values({
        templateName: 'default', dayType: 'saturday',
        startTime: b.start, endTime: b.end,
        category: b.category, label: b.label, sortOrder: sort++
      });
    }

    sort = 1;
    for (const b of sundayBlocks) {
      await db.insert(schema.dailyTemplateBlocks).values({
        templateName: 'default', dayType: 'sunday',
        startTime: b.start, endTime: b.end,
        category: b.category, label: b.label, sortOrder: sort++
      });
    }

    // 5. Timetable Slots
    for (const slot of apurvaTimetable) {
      await db.insert(schema.timetableSlots).values(slot);
    }

    console.log("Seeding complete successfully!");

  } catch (error) {
    console.error("Seeding failed:", error);
  }
}

seed();
