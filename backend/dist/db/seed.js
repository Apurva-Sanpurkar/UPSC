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
            name: 'Sai Ranadive',
            dob: '2005-04-24',
            upscAttemptYear: 2027,
            prelimsDate: '2027-05-23',
            mainsDate: '2027-08-20',
        }).returning();
        // 2. Settings
        await index_1.db.insert(schema.settings).values({
            userId: user.id,
            wakeTime: '06:00',
            sleepTime: '23:30',
            travelMinutesEachWay: 60,
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
        console.log("Seeding complete successfully!");
    }
    catch (error) {
        console.error("Seeding failed:", error);
    }
}
seed();
