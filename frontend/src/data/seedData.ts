import type { TimetableSlot, TemplateBlock, UPSCPhase, Subject, SprintWeek, MicroTopic } from '../types';

let _id = 0;
const uid = () => `seed-${++_id}`;

// ===== COLLEGE TIMETABLE (FM Batch 2 - no lab, theory only) =====
export const collegeTimetable: TimetableSlot[] = [
  // Monday
  { id: uid(), dayOfWeek:'Mon', startTime:'08:45', endTime:'09:40', slotType:'free', label:'Free' },
  { id: uid(), dayOfWeek:'Mon', startTime:'09:40', endTime:'10:35', slotType:'free', label:'Free' },
  { id: uid(), dayOfWeek:'Mon', startTime:'10:40', endTime:'11:35', slotType:'free', label:'Free' },
  { id: uid(), dayOfWeek:'Mon', startTime:'11:35', endTime:'12:30', slotType:'lunch', label:'Lunch' },
  { id: uid(), dayOfWeek:'Mon', startTime:'12:30', endTime:'13:25', slotType:'class', label:'CN' },
  { id: uid(), dayOfWeek:'Mon', startTime:'13:25', endTime:'14:20', slotType:'class', label:'DAA' },
  { id: uid(), dayOfWeek:'Mon', startTime:'14:25', endTime:'15:20', slotType:'free', label:'Free' },
  { id: uid(), dayOfWeek:'Mon', startTime:'15:25', endTime:'16:20', slotType:'free', label:'Free' },
  // Tuesday
  { id: uid(), dayOfWeek:'Tue', startTime:'08:45', endTime:'09:40', slotType:'class', label:'DAA' },
  { id: uid(), dayOfWeek:'Tue', startTime:'09:40', endTime:'10:35', slotType:'free', label:'Free' },
  { id: uid(), dayOfWeek:'Tue', startTime:'10:40', endTime:'11:35', slotType:'class', label:'FM (Theory)' },
  { id: uid(), dayOfWeek:'Tue', startTime:'11:35', endTime:'12:30', slotType:'lunch', label:'Lunch' },
  { id: uid(), dayOfWeek:'Tue', startTime:'12:30', endTime:'13:25', slotType:'class', label:'CN' },
  { id: uid(), dayOfWeek:'Tue', startTime:'13:25', endTime:'14:20', slotType:'class', label:'TOC' },
  { id: uid(), dayOfWeek:'Tue', startTime:'14:25', endTime:'15:20', slotType:'class', label:'POE' },
  { id: uid(), dayOfWeek:'Tue', startTime:'15:25', endTime:'16:20', slotType:'class', label:'POE' },
  // Wednesday
  { id: uid(), dayOfWeek:'Wed', startTime:'08:45', endTime:'10:35', slotType:'class', label:'DAAL (Lab, B3)' },
  { id: uid(), dayOfWeek:'Wed', startTime:'10:40', endTime:'11:35', slotType:'class', label:'FM (Theory)' },
  { id: uid(), dayOfWeek:'Wed', startTime:'11:35', endTime:'12:30', slotType:'lunch', label:'Lunch' },
  { id: uid(), dayOfWeek:'Wed', startTime:'12:30', endTime:'13:25', slotType:'class', label:'TOC' },
  { id: uid(), dayOfWeek:'Wed', startTime:'13:25', endTime:'14:20', slotType:'free', label:'Free' },
  { id: uid(), dayOfWeek:'Wed', startTime:'14:25', endTime:'15:20', slotType:'free', label:'Free' },
  { id: uid(), dayOfWeek:'Wed', startTime:'15:25', endTime:'16:20', slotType:'free', label:'Free' },
  // Thursday
  { id: uid(), dayOfWeek:'Thu', startTime:'08:45', endTime:'09:40', slotType:'class', label:'CN' },
  { id: uid(), dayOfWeek:'Thu', startTime:'09:40', endTime:'10:35', slotType:'free', label:'Free' },
  { id: uid(), dayOfWeek:'Thu', startTime:'10:40', endTime:'11:35', slotType:'class', label:'FM (Theory)' },
  { id: uid(), dayOfWeek:'Thu', startTime:'11:35', endTime:'12:30', slotType:'lunch', label:'Lunch' },
  { id: uid(), dayOfWeek:'Thu', startTime:'12:30', endTime:'13:25', slotType:'free', label:'Free' },
  { id: uid(), dayOfWeek:'Thu', startTime:'13:25', endTime:'14:20', slotType:'free', label:'Free' },
  { id: uid(), dayOfWeek:'Thu', startTime:'14:25', endTime:'16:20', slotType:'class', label:'Flexi (AKK)' },
  // Friday
  { id: uid(), dayOfWeek:'Fri', startTime:'08:45', endTime:'09:40', slotType:'free', label:'Free' },
  { id: uid(), dayOfWeek:'Fri', startTime:'09:40', endTime:'10:35', slotType:'free', label:'Free' },
  { id: uid(), dayOfWeek:'Fri', startTime:'10:40', endTime:'11:35', slotType:'free', label:'Free' },
  { id: uid(), dayOfWeek:'Fri', startTime:'11:35', endTime:'12:30', slotType:'lunch', label:'Lunch' },
  { id: uid(), dayOfWeek:'Fri', startTime:'12:30', endTime:'13:25', slotType:'class', label:'TOC' },
  { id: uid(), dayOfWeek:'Fri', startTime:'13:25', endTime:'14:20', slotType:'class', label:'DAA' },
  { id: uid(), dayOfWeek:'Fri', startTime:'14:25', endTime:'16:20', slotType:'class', label:'CNL (B3)' },
  // Saturday
  { id: uid(), dayOfWeek:'Sat', startTime:'08:45', endTime:'09:40', slotType:'free', label:'Free' },
  { id: uid(), dayOfWeek:'Sat', startTime:'09:40', endTime:'10:35', slotType:'free', label:'Free' },
  { id: uid(), dayOfWeek:'Sat', startTime:'10:40', endTime:'11:35', slotType:'free', label:'Free' },
  { id: uid(), dayOfWeek:'Sat', startTime:'11:35', endTime:'12:30', slotType:'lunch', label:'Lunch' },
  { id: uid(), dayOfWeek:'Sat', startTime:'12:30', endTime:'13:25', slotType:'class', label:'Flexi' },
  { id: uid(), dayOfWeek:'Sat', startTime:'13:25', endTime:'14:20', slotType:'class', label:'Flexi' },
  { id: uid(), dayOfWeek:'Sat', startTime:'14:25', endTime:'15:20', slotType:'free', label:'Free' },
  { id: uid(), dayOfWeek:'Sat', startTime:'15:25', endTime:'16:20', slotType:'free', label:'Free' },
];

// ===== DEFAULT WEEKDAY TEMPLATE =====
const defaultWeekday: Omit<TemplateBlock,'id'>[] = [
  { templateName:'default', dayType:'weekday', startTime:'06:00', endTime:'06:30', category:'routine', label:'Wake, freshen, water', sortOrder:1 },
  { templateName:'default', dayType:'weekday', startTime:'06:30', endTime:'07:30', category:'upsc', label:'UPSC Deep Study (Morning)', sortOrder:2 },
  { templateName:'default', dayType:'weekday', startTime:'07:30', endTime:'08:45', category:'travel', label:'Breakfast & Travel to college', sortOrder:3 },
  { templateName:'default', dayType:'weekday', startTime:'08:45', endTime:'16:20', category:'college', label:'College & Current Affairs', sortOrder:4 },
  { templateName:'default', dayType:'weekday', startTime:'16:20', endTime:'17:20', category:'travel', label:'Travel home', sortOrder:5 },
  { templateName:'default', dayType:'weekday', startTime:'17:20', endTime:'18:30', category:'routine', label:'Rest & Freshen', sortOrder:6 },
  { templateName:'default', dayType:'weekday', startTime:'18:30', endTime:'20:00', category:'college', label:'Internship (Work from home)', sortOrder:7 },
  { templateName:'default', dayType:'weekday', startTime:'20:00', endTime:'20:30', category:'meal', label:'Dinner', sortOrder:8 },
  { templateName:'default', dayType:'weekday', startTime:'20:30', endTime:'22:00', category:'upsc', label:'UPSC Deep Study (Evening)', sortOrder:9 },
  { templateName:'default', dayType:'weekday', startTime:'22:00', endTime:'23:00', category:'academic', label:'Academics', sortOrder:10 },
  { templateName:'default', dayType:'weekday', startTime:'23:00', endTime:'23:30', category:'review', label:'Review & Plan', sortOrder:11 },
];

const defaultSaturday: Omit<TemplateBlock,'id'>[] = [
  { templateName:'default', dayType:'saturday', startTime:'06:00', endTime:'07:30', category:'upsc', label:'UPSC Deep Study (Morning)', sortOrder:1 },
  { templateName:'default', dayType:'saturday', startTime:'07:30', endTime:'08:45', category:'travel', label:'Breakfast & Travel to college', sortOrder:2 },
  { templateName:'default', dayType:'saturday', startTime:'08:45', endTime:'16:20', category:'college', label:'College (Free periods)', sortOrder:3 },
  { templateName:'default', dayType:'saturday', startTime:'16:20', endTime:'17:20', category:'travel', label:'Travel home', sortOrder:4 },
  { templateName:'default', dayType:'saturday', startTime:'17:20', endTime:'18:00', category:'routine', label:'Rest', sortOrder:5 },
  { templateName:'default', dayType:'saturday', startTime:'18:00', endTime:'20:00', category:'content', label:'Content Creation (Scripting/Shooting)', sortOrder:6 },
  { templateName:'default', dayType:'saturday', startTime:'20:00', endTime:'20:45', category:'meal', label:'Dinner', sortOrder:7 },
  { templateName:'default', dayType:'saturday', startTime:'20:45', endTime:'22:30', category:'upsc', label:'UPSC Deep Study', sortOrder:8 },
  { templateName:'default', dayType:'saturday', startTime:'22:30', endTime:'23:30', category:'review', label:'Content Org & Plan', sortOrder:9 },
];

const defaultSunday: Omit<TemplateBlock,'id'>[] = [
  { templateName:'default', dayType:'sunday', startTime:'06:00', endTime:'09:00', category:'upsc', label:'UPSC Answer Writing / Optional', sortOrder:1 },
  { templateName:'default', dayType:'sunday', startTime:'09:00', endTime:'10:00', category:'meal', label:'Breakfast', sortOrder:2 },
  { templateName:'default', dayType:'sunday', startTime:'10:00', endTime:'13:00', category:'content', label:'Content Creation (Editing)', sortOrder:3 },
  { templateName:'default', dayType:'sunday', startTime:'13:00', endTime:'14:00', category:'meal', label:'Lunch', sortOrder:4 },
  { templateName:'default', dayType:'sunday', startTime:'14:00', endTime:'17:00', category:'academic', label:'Academic Deep Study', sortOrder:5 },
  { templateName:'default', dayType:'sunday', startTime:'17:00', endTime:'20:00', category:'content', label:'Content Publishing', sortOrder:6 },
  { templateName:'default', dayType:'sunday', startTime:'20:00', endTime:'20:45', category:'meal', label:'Dinner', sortOrder:7 },
  { templateName:'default', dayType:'sunday', startTime:'20:45', endTime:'22:30', category:'review', label:'Weekly Review', sortOrder:8 },
  { templateName:'default', dayType:'sunday', startTime:'22:30', endTime:'23:30', category:'rest', label:'Rest', sortOrder:9 },
];

export const templateBlocks: TemplateBlock[] = [
  ...defaultWeekday.map(b => ({ ...b, id: uid() })),
  ...defaultSaturday.map(b => ({ ...b, id: uid() })),
  ...defaultSunday.map(b => ({ ...b, id: uid() })),
];

// ===== ACADEMIC SUBJECTS =====
export const academicSubjects: Subject[] = [
  { id:'toc', type:'academic', name:'Theory of Computation', examDate:'2026-11-17', totalUnits:5 },
  { id:'cn', type:'academic', name:'Computer Networks', examDate:'2026-11-19', totalUnits:5 },
  { id:'daa', type:'academic', name:'Design & Analysis of Algorithms', examDate:'2026-11-24', totalUnits:5 },
  { id:'fm', type:'academic', name:'Financial Mathematics', examDate:'2026-11-26', totalUnits:5 },
];

// ===== UPSC GS SUBJECTS =====
export const upscSubjects: Subject[] = [
  { id:'polity', type:'upsc_gs', name:'Polity', examDate:null, totalUnits:null },
  { id:'economy', type:'upsc_gs', name:'Economy & Agriculture', examDate:null, totalUnits:null },
  { id:'geography', type:'upsc_gs', name:'Geography', examDate:null, totalUnits:null },
  { id:'environment', type:'upsc_gs', name:'Environment & Disaster Mgmt', examDate:null, totalUnits:null },
  { id:'int-security', type:'upsc_gs', name:'Internal Security', examDate:null, totalUnits:null },
  { id:'indian-society', type:'upsc_gs', name:'Indian Society', examDate:null, totalUnits:null },
  { id:'ethics', type:'upsc_gs', name:'Ethics (GS-IV)', examDate:null, totalUnits:null },
  { id:'governance', type:'upsc_gs', name:'Governance', examDate:null, totalUnits:null },
  { id:'history', type:'upsc_gs', name:'History', examDate:null, totalUnits:null },
  { id:'science-tech', type:'upsc_gs', name:'Science & Technology', examDate:null, totalUnits:null },
  { id:'ir', type:'upsc_gs', name:'International Relations', examDate:null, totalUnits:null },
  { id:'pub-admin', type:'upsc_optional', name:'Public Administration', examDate:null, totalUnits:null },
];

// ===== UPSC PHASES =====
export const upscPhases: UPSCPhase[] = [
  { phase:1, calendarWindow:'Jul – Sep 2026', morningSubject:'Polity', eveningSubject:'Economy & Agriculture', microPlannerDays:'62', notes:'Optional Paper 1 on Sundays', startDate:'2026-07-01', endDate:'2026-09-30' },
  { phase:2, calendarWindow:'Oct 2026', morningSubject:'Geography', eveningSubject:'Environment + Disaster Mgmt', microPlannerDays:'54', notes:'UPSC hours shrink from ~15 Oct', startDate:'2026-10-01', endDate:'2026-10-31' },
  { phase:3, calendarWindow:'Late Nov – Dec 2026', morningSubject:'Internal Security', eveningSubject:'Indian Society', microPlannerDays:'22', notes:'Resumes after Nov 26 exams', startDate:'2026-11-27', endDate:'2026-12-31' },
  { phase:4, calendarWindow:'Dec 2026 – Jan 2027', morningSubject:'Ethics (GS-IV)', eveningSubject:'Governance', microPlannerDays:'32', notes:'Ethics Case-Study module', startDate:'2026-12-15', endDate:'2027-01-31' },
  { phase:5, calendarWindow:'Jan – Feb 2027', morningSubject:'History', eveningSubject:'Science & Technology', microPlannerDays:'50', notes:'', startDate:'2027-01-15', endDate:'2027-02-28' },
  { phase:6, calendarWindow:'Feb – Mar 2027', morningSubject:'International Relations', eveningSubject:'Buffer / catch-up', microPlannerDays:'14', notes:'60% syllabus checkpoint', startDate:'2027-02-15', endDate:'2027-03-31' },
  { phase:7, calendarWindow:'Mar – Apr 2027', morningSubject:'Full-syllabus revision + Prelims Test Series', eveningSubject:'—', microPlannerDays:'—', notes:'PYQ Microtheme practice', startDate:'2027-03-15', endDate:'2027-04-30' },
  { phase:8, calendarWindow:'May 2027', morningSubject:'Final revision', eveningSubject:'—', microPlannerDays:'—', notes:'No new content in final 10 days', startDate:'2027-05-01', endDate:'2027-05-23' },
  { phase:9, calendarWindow:'Jun – Aug 2027', morningSubject:'Mains-focused: answer writing + Optional Paper 2', eveningSubject:'—', microPlannerDays:'—', notes:'3→15+ answers/day', startDate:'2027-05-24', endDate:'2027-08-20' },
];

// ===== SPRINT WEEKS =====
export const sprintWeeks: SprintWeek[] = [
  { week:1, dates:'15–21 Oct', focus:'Unit 1 — all 4 subjects', startDate:'2026-10-15', endDate:'2026-10-21' },
  { week:2, dates:'22–28 Oct', focus:'Unit 2 — all 4 subjects', startDate:'2026-10-22', endDate:'2026-10-28' },
  { week:3, dates:'29 Oct – 4 Nov', focus:'Unit 3 — all 4 subjects', startDate:'2026-10-29', endDate:'2026-11-04' },
  { week:4, dates:'5–11 Nov', focus:'Unit 4 — all 4 subjects', startDate:'2026-11-05', endDate:'2026-11-11' },
  { week:5, dates:'12–16 Nov', focus:'Unit 5 + revision (ToC & CN priority)', startDate:'2026-11-12', endDate:'2026-11-16' },
  { week:6, dates:'20–26 Nov', focus:'DAA + FM Unit 5, revision, PYQs', startDate:'2026-11-20', endDate:'2026-11-26' },
];

// ===== SAMPLE MICRO TOPICS =====
export const sampleMicroTopics: MicroTopic[] = [
  // Polity
  { id:'p-1', subjectId:'polity', dayNumber:1, title:'Historical Background of the Constitution', subtopics:['British era constitutional experiments','Regulating Act 1773','Pitt\'s India Act 1784','Charter Acts','Indian Councils Acts','GoI Acts 1919 & 1935','Constituent Assembly debates'], resources:['Laxmikanth Ch 1-3','NCERT Class 11 Political Science'], plannedDate:'2026-07-07', status:'pending', completedAt:null },
  { id:'p-2', subjectId:'polity', dayNumber:2, title:'Making of the Constitution', subtopics:['Constituent Assembly composition','Objective Resolution','Drafting Committee','Key debates','Borrowed features','Philosophy of the Constitution'], resources:['Laxmikanth Ch 2','Granville Austin - Indian Constitution'], plannedDate:'2026-07-08', status:'pending', completedAt:null },
  { id:'p-3', subjectId:'polity', dayNumber:3, title:'Salient Features of the Constitution', subtopics:['Lengthiest written constitution','Federal system with unitary bias','Parliamentary form','Blend of rigidity & flexibility','Integrated judiciary','Fundamental Rights overview','DPSPs overview','Single citizenship'], resources:['Laxmikanth Ch 3-4'], plannedDate:'2026-07-09', status:'pending', completedAt:null },
  { id:'p-4', subjectId:'polity', dayNumber:4, title:'Preamble & Union and its Territory', subtopics:['Preamble keywords','Sovereign, Socialist, Secular, Democratic, Republic','Justice, Liberty, Equality, Fraternity','Amendability of Preamble','States formation & reorganisation','Articles 1-4'], resources:['Laxmikanth Ch 4-5'], plannedDate:'2026-07-10', status:'pending', completedAt:null },
  { id:'p-5', subjectId:'polity', dayNumber:5, title:'Citizenship', subtopics:['Constitutional provisions','Citizenship Act 1955','Acquisition & loss','Single citizenship','CAA 2019','OCI & PIO'], resources:['Laxmikanth Ch 6'], plannedDate:'2026-07-11', status:'pending', completedAt:null },
  // Economy
  { id:'e-1', subjectId:'economy', dayNumber:1, title:'Basic Concepts of Economics', subtopics:['GDP, GNP, NNP','Factor cost vs Market price','Real vs Nominal GDP','GDP deflator','PPP','Human Development Index'], resources:['Ramesh Singh Ch 1','NCERT Macro Ch 1-2'], plannedDate:'2026-07-07', status:'pending', completedAt:null },
  { id:'e-2', subjectId:'economy', dayNumber:2, title:'Money, Banking & Financial System', subtopics:['Functions of money','Commercial banks','RBI structure & functions','Monetary policy tools','CRR, SLR, Repo, Reverse Repo','Financial markets overview'], resources:['Ramesh Singh Ch 6-7','RBI website'], plannedDate:'2026-07-08', status:'pending', completedAt:null },
  { id:'e-3', subjectId:'economy', dayNumber:3, title:'Fiscal Policy & Budgeting', subtopics:['Revenue & capital account','Fiscal deficit types','FRBM Act','Budget process','Tax structure','GST framework'], resources:['Ramesh Singh Ch 9-10'], plannedDate:'2026-07-09', status:'pending', completedAt:null },
  // History
  { id:'h-1', subjectId:'history', dayNumber:1, title:'Prehistoric India', subtopics:['Paleolithic','Mesolithic','Neolithic','Chalcolithic cultures','Key sites','Tools & subsistence patterns'], resources:['NCERT Class 6','R.S. Sharma Ch 1-3'], plannedDate:'2027-01-15', status:'pending', completedAt:null },
  { id:'h-2', subjectId:'history', dayNumber:2, title:'Vedic Period', subtopics:['Rig Vedic society','Later Vedic changes','Political organisation','Economy & trade','Religion & philosophy','Varna system origins'], resources:['R.S. Sharma Ch 5-8','NCERT Class 6'], plannedDate:'2027-01-16', status:'pending', completedAt:null },
  { id:'h-3', subjectId:'history', dayNumber:3, title:'Indus Valley Civilization', subtopics:['Discovery & excavations','Geographical extent','Town planning & drainage','Economic life','Religion & seals','Script & administration','Decline theories','PYQ themes'], resources:['NCERT Class 6','R.S. Sharma','Upinder Singh'], plannedDate:'2027-01-17', status:'pending', completedAt:null },
  // Public Administration
  { id:'pa-1', subjectId:'pub-admin', dayNumber:1, title:'Introduction to Public Administration', subtopics:['Definition & scope','Public vs Private administration','Evolution as a discipline','Wilson\'s essay','Politics-Administration dichotomy','New Public Administration','New Public Management'], resources:['Laxmikanth Public Admin','IGNOU MPA'], plannedDate:'2026-07-13', status:'pending', completedAt:null },
];
