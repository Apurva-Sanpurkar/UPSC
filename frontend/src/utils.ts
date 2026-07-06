import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, format, isAfter, isBefore, isToday, parseISO, startOfDay } from 'date-fns';
import type { BlockCategory, DayType, TemplateBlock } from './types';

export function daysUntil(dateStr: string): number {
  const target = parseISO(dateStr);
  const now = startOfDay(new Date());
  return Math.max(0, differenceInDays(target, now));
}

export function weeksUntil(dateStr: string): number {
  return Math.round(daysUntil(dateStr) / 7 * 10) / 10;
}

export function liveCountdown(dateStr: string) {
  const target = parseISO(dateStr);
  const now = new Date();
  if (isAfter(now, target)) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const totalSec = differenceInSeconds(target, now);
  const d = Math.floor(totalSec / 86400);
  const h = Math.floor((totalSec % 86400) / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return { days: d, hours: h, minutes: m, seconds: s };
}

export function getDayType(date: Date): DayType {
  const dow = date.getDay();
  if (dow === 0) return 'sunday';
  if (dow === 6) return 'saturday';
  return 'weekday';
}

export function getDayName(date: Date): string {
  return format(date, 'EEE');
}

export function formatDate(dateStr: string): string {
  return format(parseISO(dateStr), 'dd MMM yyyy');
}

export function formatDateShort(dateStr: string): string {
  return format(parseISO(dateStr), 'dd MMM');
}

export function isInDateRange(date: Date, from: string, to: string): boolean {
  const d = startOfDay(date);
  return !isBefore(d, parseISO(from)) && !isAfter(d, parseISO(to));
}

export function getActiveTemplate(date: Date): 'default' | 'exam_sprint' {
  if (isInDateRange(date, '2026-10-15', '2026-11-26')) return 'exam_sprint';
  return 'default';
}

export function getBlocksForDay(blocks: TemplateBlock[], date: Date): TemplateBlock[] {
  const dayType = getDayType(date);
  const template = getActiveTemplate(date);
  return blocks
    .filter(b => b.dayType === dayType && b.templateName === template)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function categoryColor(category: BlockCategory): string {
  const map: Record<string, string> = {
    upsc: '#16A34A',
    academic: '#F97316',
    content: '#8B5CF6',
    college: '#3B82F6',
    travel: '#6B7280',
    routine: '#9CA3AF',
    meal: '#F59E0B',
    review: '#06B6D4',
    sleep: '#1E293B',
    rest: '#A78BFA',
  };
  return map[category] || '#6B7280';
}

export function categoryBg(category: BlockCategory): string {
  const map: Record<string, string> = {
    upsc: '#F0FDF4',
    academic: '#FFF7ED',
    content: '#EDE9FE',
    college: '#DBEAFE',
    travel: '#F3F4F6',
    routine: '#F9FAFB',
    meal: '#FEF3C7',
    review: '#ECFEFF',
    sleep: '#F1F5F9',
    rest: '#F5F3FF',
  };
  return map[category] || '#F9FAFB';
}

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

export function minutesDiff(start: string, end: string): number {
  let s = timeToMinutes(start);
  let e = timeToMinutes(end);
  if (e < s) e += 1440; // crosses midnight
  return e - s;
}

export function todayStr(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

export function getCurrentDate(): Date {
  return new Date();
}

export function formatTime12h(time24: string): string {
  if (!time24) return '';
  const [h, m] = time24.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12}:${m.toString().padStart(2, '0')} ${ampm}`;
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

export function paceStatus(backlogDays: number, bufferDays: number): 'green' | 'amber' | 'red' {
  if (backlogDays === 0) return 'green';
  if (backlogDays <= bufferDays) return 'amber';
  return 'red';
}
