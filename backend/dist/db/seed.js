"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const schema = __importStar(require("./schema"));
const dotenv = __importStar(require("dotenv"));
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
    { name: 'Artificial Intelligence', examDate: '2026-11-18', totalUnits: 5, type: 'academic' },
    { name: 'Machine Learning', examDate: '2026-11-20', totalUnits: 5, type: 'academic' },
    { name: 'Internet of Things', examDate: '2026-11-24', totalUnits: 5, type: 'academic' },
    { name: 'System Programming', examDate: '2026-11-26', totalUnits: 5, type: 'academic' },
    { name: 'Design Thinking', examDate: '2026-11-28', totalUnits: 5, type: 'academic' },
];
const weekdayBlocks = [
    { start: '06:30', end: '07:00', category: 'routine', label: 'Wake, freshen, water' },
    { start: '07:00', end: '09:00', category: 'upsc', label: 'UPSC Deep Study & Answer Writing' },
    { start: '09:00', end: '10:00', category: 'routine', label: 'Breakfast, Shower & Get Ready' },
    { start: '10:00', end: '12:00', category: 'travel', label: '🚌 Bus Transit (2 hrs) -> Audiobooks / YouTube Study / Current Affairs' },
    { start: '12:00', end: '18:00', category: 'college', label: 'College Lectures & Labs (VIT Kondhwa AI & DS)' },
    { start: '18:00', end: '20:00', category: 'travel', label: '🚌 Bus Transit Home (2 hrs) -> Revision Podcasts / Relax & Music' },
    { start: '20:00', end: '21:00', category: 'meal', label: 'Dinner & Rest with Family' },
    { start: '21:00', end: '22:30', category: 'academic', label: 'AI & DS Academic Study / Coding Practice' },
    { start: '22:30', end: '23:00', category: 'review', label: 'Extra Activities & Daily Growth Review' },
];
const saturdayBlocks = [
    { start: '07:00', end: '09:30', category: 'upsc', label: 'UPSC Deep Study (Morning Session)' },
    { start: '09:30', end: '10:30', category: 'meal', label: 'Breakfast & Relax' },
    { start: '10:30', end: '13:30', category: 'academic', label: 'AI & DS Coding / Hackathon / Project Work' },
    { start: '13:30', end: '15:00', category: 'meal', label: 'Lunch & Afternoon Rest' },
    { start: '15:00', end: '18:00', category: 'content', label: 'Extra Activities / Hobbies / Outings with Friends' },
    { start: '18:00', end: '20:00', category: 'upsc', label: 'UPSC Optional Subject Study' },
    { start: '20:00', end: '21:00', category: 'meal', label: 'Dinner' },
    { start: '21:00', end: '22:30', category: 'review', label: 'Weekly Planning & Growth Reflections' },
];
const sundayBlocks = [
    { start: '07:00', end: '10:00', category: 'upsc', label: 'UPSC Mock Test & Answer Writing Practice' },
    { start: '10:00', end: '11:00', category: 'meal', label: 'Sunday Brunch & Relax' },
    { start: '11:00', end: '14:00', category: 'content', label: 'Extra Activities / Hobbies / Personal Life' },
    { start: '14:00', end: '16:00', category: 'meal', label: 'Lunch & Rest' },
    { start: '16:00', end: '19:00', category: 'academic', label: 'Academic Revision & Upcoming Week Prep' },
    { start: '19:00', end: '20:30', category: 'content', label: 'Family Time / Leisure / Reading' },
    { start: '20:30', end: '21:30', category: 'meal', label: 'Dinner' },
    { start: '21:30', end: '22:30', category: 'review', label: 'Set Next Week Goals & Sleep Early' },
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
        const existingUsers = await index_1.db.select().from(schema.users);
        if (existingUsers.length > 0) {
            console.log("Database already seeded!");
            return;
        }
        // 1. Users
        const [user] = await index_1.db.insert(schema.users).values({
            name: 'Apurva Sanpurkar',
            dob: '2005-10-20',
            upscAttemptYear: 2027,
            prelimsDate: '2027-05-23',
            mainsDate: '2027-08-20',
        }).returning();
        // 2. Settings
        await index_1.db.insert(schema.settings).values({
            userId: user.id,
            wakeTime: '06:30',
            sleepTime: '23:00',
            travelMinutesEachWay: 120,
            optionalSubjectName: 'Public Administration',
        });
        // 3. Subjects
        for (const subj of [...upscSubjects, ...academicSubjects]) {
            await index_1.db.insert(schema.subjects).values(subj);
        }
        // 4. Daily Template Blocks
        let sort = 1;
        for (const b of weekdayBlocks) {
            await index_1.db.insert(schema.dailyTemplateBlocks).values({
                templateName: 'default', dayType: 'weekday',
                startTime: b.start, endTime: b.end,
                category: b.category, label: b.label, sortOrder: sort++
            });
        }
        sort = 1;
        for (const b of saturdayBlocks) {
            await index_1.db.insert(schema.dailyTemplateBlocks).values({
                templateName: 'default', dayType: 'saturday',
                startTime: b.start, endTime: b.end,
                category: b.category, label: b.label, sortOrder: sort++
            });
        }
        sort = 1;
        for (const b of sundayBlocks) {
            await index_1.db.insert(schema.dailyTemplateBlocks).values({
                templateName: 'default', dayType: 'sunday',
                startTime: b.start, endTime: b.end,
                category: b.category, label: b.label, sortOrder: sort++
            });
        }
        // 5. Timetable Slots
        for (const slot of apurvaTimetable) {
            await index_1.db.insert(schema.timetableSlots).values(slot);
        }
        console.log("Seeding complete successfully!");
    }
    catch (error) {
        console.error("Seeding failed:", error);
    }
}
seed();
