import fs from 'fs';
import path from 'path';
import { CalendarEntry, TrashSchedule } from './CalendarEntry';
import { TrashType, buildResponseTrashTypeData } from './TrashType';
import { daysOfWeek } from './Week';

const buildDisplaySchedule = (schedule: TrashSchedule) => {
  const prefix =
    schedule.weeks === undefined || schedule.weeks.length === 0
      ? '毎週'
      : `第${schedule.weeks.join('、')}`;
  const days = schedule.days.map((d) => daysOfWeek[d]).join('、');
  return `${prefix}${days}曜日`;
};

const loadCalendarData = () => {
  const calendar = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), '/data-generator/opt/schedule.json'),
      'utf8',
    ),
  ) as CalendarEntry[];

  calendar.forEach((c) => {
    c.burnable.displayInfo = {
      type: buildResponseTrashTypeData(TrashType.BURNABLE),
      schedule: buildDisplaySchedule(c.burnable),
    };
    c.harmful.displayInfo = {
      type: buildResponseTrashTypeData(TrashType.HARMFUL),
      schedule: buildDisplaySchedule(c.harmful),
    };
    c.incombustible.displayInfo = {
      type: buildResponseTrashTypeData(TrashType.INCOMBUSTIBLE),
      schedule: buildDisplaySchedule(c.incombustible),
    };
    c.recyclable.displayInfo = {
      type: buildResponseTrashTypeData(TrashType.RECYCLABLE),
      schedule: buildDisplaySchedule(c.recyclable),
    };
  });

  return calendar;
};

const calendarSource = loadCalendarData();

export const getCalendarSource = () => calendarSource;
