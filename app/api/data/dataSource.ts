import fs from 'fs';
import path from 'path';
import { CalendarEntry, TrashSchedule } from './CalendarEntry';
import { daysOfWeek } from './Week';

const loadCalendarData = () => {
  const calendar = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), '/data-generator/opt/schedule.json'),
      'utf8',
    ),
  ) as CalendarEntry[];

  return calendar;
};

const calendarSource = loadCalendarData();

export const getCalendarSource = () => calendarSource;
