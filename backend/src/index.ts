import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { db } from './db';
import * as schema from './db/schema';
import { eq, and, lte, gte } from 'drizzle-orm';
import { startOfWeek, endOfWeek, format, addDays } from 'date-fns';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const PIN = '2413';

// Auth Route
app.post('/api/auth/login', (req, res) => {
  const { pin } = req.body;
  if (pin === 'ILoveyouSai') {
    const token = jwt.sign({ user: 'apurva' }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid Password' });
  }
});

// Middleware
const authenticate = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

app.use(authenticate);

// Settings
app.get('/api/settings', async (req, res) => {
  const allSettings = await db.select().from(schema.settings);
  res.json(allSettings[0] || {});
});

app.put('/api/settings', async (req, res) => {
  // Simple update logic
  const body = req.body;
  const existing = await db.select().from(schema.settings);
  if (existing.length === 0) {
    // wait, we need a user id, let's just assume we have 1 user
    const users = await db.select().from(schema.users);
    if(users.length > 0) {
      await db.insert(schema.settings).values({ userId: users[0].id, ...body });
    }
  } else {
    await db.update(schema.settings).set(body).where(eq(schema.settings.userId, existing[0].userId));
  }
  res.json({ success: true });
});

// Timetable
app.get('/api/timetable', async (req, res) => {
  const blocks = await db.select().from(schema.dailyTemplateBlocks);
  const college = await db.select().from(schema.timetableSlots);
  res.json({ blocks, college });
});

// Study Sessions
app.get('/api/study-sessions', async (req, res) => {
  const { date } = req.query;
  const sessions = await db.select().from(schema.studySessions).where(eq(schema.studySessions.date, date as string));
  res.json(sessions);
});

app.patch('/api/study-sessions/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  await db.update(schema.studySessions).set(updates).where(eq(schema.studySessions.id, id));
  res.json({ success: true });
});

app.post('/api/study-sessions', async (req, res) => {
  const session = req.body;
  const users = await db.select().from(schema.users);
  if(users.length > 0) {
    await db.insert(schema.studySessions).values({ ...session, userId: users[0].id });
  }
  res.json({ success: true });
});

// Content Calendar
app.get('/api/content-calendar', async (req, res) => {
  const items = await db.select().from(schema.contentCalendar);
  res.json(items);
});

app.post('/api/content-calendar', async (req, res) => {
  const item = req.body;
  await db.insert(schema.contentCalendar).values(item);
  res.json({ success: true });
});

app.patch('/api/content-calendar/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  await db.update(schema.contentCalendar).set(updates).where(eq(schema.contentCalendar.id, id));
  res.json({ success: true });
});

// Tasks
app.get('/api/tasks', async (req, res) => {
  const allTasks = await db.select().from(schema.tasks);
  res.json(allTasks);
});

app.post('/api/tasks', async (req, res) => {
  const task = req.body;
  await db.insert(schema.tasks).values(task);
  res.json({ success: true });
});

app.patch('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  await db.update(schema.tasks).set(updates).where(eq(schema.tasks.id, id));
  res.json({ success: true });
});

app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  await db.delete(schema.tasks).where(eq(schema.tasks.id, id));
  res.json({ success: true });
});


// Streaks
app.get('/api/streaks', async (req, res) => {
  const allStreaks = await db.select().from(schema.streaks);
  res.json(allStreaks);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
