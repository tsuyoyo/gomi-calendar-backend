import { TrashSchedule } from '../data/CalendarEntry';
import { daysOfWeek, daysOfWeekEn } from '../data/Week';

const ordinalize = (weekNum: number) => {
  switch (weekNum) {
    case 1:
      return '1st';
    case 2:
      return '2nd';
    case 3:
      return '3rd';
    case 4:
      return '4th';
    case 5:
      return '5th';
    default:
      return '';
  }
};

export const buildDisplayScheduleText = (
  schedule: TrashSchedule,
  locale: string | null,
) => {
  if (locale === 'en') {
    if (schedule.weeks === undefined || schedule.weeks.length === 0) {
      return `Every ${schedule.days.map((d) => daysOfWeekEn[d]).join(',')}`;
    } else {
      return (
        `Every ` +
        `${schedule.weeks.map((w) => ordinalize(w)).join(',')} ` +
        `${schedule.days.map((d) => daysOfWeekEn[d]).join(',')}`
      );
    }
  } else {
    const prefix =
      schedule.weeks === undefined || schedule.weeks.length === 0
        ? '毎週'
        : `第${schedule.weeks.join('、')}`;
    const days = schedule.days.map((d) => daysOfWeek[d]).join('、');
    return `${prefix}${days}曜日`;
  }
};
