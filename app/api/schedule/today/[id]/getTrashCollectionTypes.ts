import type {
  CalendarEntry,
  TrashSchedule,
} from '../../../data/CalendarEntry';
import { TrashType } from '../../../data/TrashType';
import { getNthWeekdayInTheMonth } from '../getNthWeekdayInMonth';

const isTrashCollectable = (schedule: TrashSchedule, date: Date) => {
  const day = date.getDay();
  const weekNumber = getNthWeekdayInTheMonth(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  );
  if (schedule.weeks === undefined || schedule.weeks.length === 0) {
    return schedule.days.find((d) => d === day) !== undefined;
  } else {
    return (
      schedule.weeks.find((w) => w === weekNumber) !== undefined &&
      schedule.days.find((d) => d === day) !== undefined
    );
  }
};

export const getTrashCollectionTypes = (
  calendar: CalendarEntry,
  year: number,
  month: number, // 1 origin
  dateInMonth: number,
): TrashType[] => {
  const targetDate = new Date(year, month - 1, dateInMonth);

  const isBurnableCollectable = isTrashCollectable(
    calendar.burnable,
    targetDate,
  );

  const isIncombustibleCollectable = isTrashCollectable(
    calendar.incombustible,
    targetDate,
  );

  const isRecyclableCollectable = isTrashCollectable(
    calendar.recyclable,
    targetDate,
  );

  const isHarmfulCollectable = isTrashCollectable(
    calendar.harmful,
    targetDate,
  );

  let types = Array();
  if (isBurnableCollectable) {
    types.push(TrashType.BURNABLE);
  }
  if (isIncombustibleCollectable) {
    types.push(TrashType.INCOMBUSTIBLE);
  }
  if (isRecyclableCollectable) {
    types.push(TrashType.RECYCLABLE);
  }
  if (isHarmfulCollectable) {
    types.push(TrashType.HARMFUL);
  }
  return types;
};
