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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const schema = __importStar(require("./db/schema"));
const drizzle_orm_1 = require("drizzle-orm");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const PIN = '2413';
// Auth Route
app.post('/api/auth/login', (req, res) => {
    const { pin } = req.body;
    if (pin === PIN) {
        const token = jsonwebtoken_1.default.sign({ user: 'sai' }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ token });
    }
    else {
        res.status(401).json({ error: 'Invalid PIN' });
    }
});
// Middleware
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token)
        return res.status(401).json({ error: 'Unauthorized' });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
app.use(authenticate);
// Settings
app.get('/api/settings', async (req, res) => {
    const allSettings = await db_1.db.select().from(schema.settings);
    res.json(allSettings[0] || {});
});
app.put('/api/settings', async (req, res) => {
    // Simple update logic
    const body = req.body;
    const existing = await db_1.db.select().from(schema.settings);
    if (existing.length === 0) {
        // wait, we need a user id, let's just assume we have 1 user
        const users = await db_1.db.select().from(schema.users);
        if (users.length > 0) {
            await db_1.db.insert(schema.settings).values({ userId: users[0].id, ...body });
        }
    }
    else {
        await db_1.db.update(schema.settings).set(body).where((0, drizzle_orm_1.eq)(schema.settings.userId, existing[0].userId));
    }
    res.json({ success: true });
});
// Timetable
app.get('/api/timetable', async (req, res) => {
    const blocks = await db_1.db.select().from(schema.dailyTemplateBlocks);
    const college = await db_1.db.select().from(schema.timetableSlots);
    res.json({ blocks, college });
});
// Study Sessions
app.get('/api/study-sessions', async (req, res) => {
    const { date } = req.query;
    const sessions = await db_1.db.select().from(schema.studySessions).where((0, drizzle_orm_1.eq)(schema.studySessions.date, date));
    res.json(sessions);
});
app.patch('/api/study-sessions/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    await db_1.db.update(schema.studySessions).set(updates).where((0, drizzle_orm_1.eq)(schema.studySessions.id, id));
    res.json({ success: true });
});
app.post('/api/study-sessions', async (req, res) => {
    const session = req.body;
    const users = await db_1.db.select().from(schema.users);
    if (users.length > 0) {
        await db_1.db.insert(schema.studySessions).values({ ...session, userId: users[0].id });
    }
    res.json({ success: true });
});
// Content Calendar
app.get('/api/content-calendar', async (req, res) => {
    const items = await db_1.db.select().from(schema.contentCalendar);
    res.json(items);
});
app.post('/api/content-calendar', async (req, res) => {
    const item = req.body;
    await db_1.db.insert(schema.contentCalendar).values(item);
    res.json({ success: true });
});
app.patch('/api/content-calendar/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    await db_1.db.update(schema.contentCalendar).set(updates).where((0, drizzle_orm_1.eq)(schema.contentCalendar.id, id));
    res.json({ success: true });
});
// Tasks
app.get('/api/tasks', async (req, res) => {
    const allTasks = await db_1.db.select().from(schema.tasks);
    res.json(allTasks);
});
app.post('/api/tasks', async (req, res) => {
    const task = req.body;
    await db_1.db.insert(schema.tasks).values(task);
    res.json({ success: true });
});
app.patch('/api/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    await db_1.db.update(schema.tasks).set(updates).where((0, drizzle_orm_1.eq)(schema.tasks.id, id));
    res.json({ success: true });
});
app.delete('/api/tasks/:id', async (req, res) => {
    const { id } = req.params;
    await db_1.db.delete(schema.tasks).where((0, drizzle_orm_1.eq)(schema.tasks.id, id));
    res.json({ success: true });
});
// Streaks
app.get('/api/streaks', async (req, res) => {
    const allStreaks = await db_1.db.select().from(schema.streaks);
    res.json(allStreaks);
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
