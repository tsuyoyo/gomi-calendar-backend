import { CalendarEntry } from '../../../../data/CalendarEntry';
import { TrashType } from '../../../../data/TrashType';
import { getDateInJst } from '../../../../date/getDateInJst';
import { getTrashCollectionTypes } from '../../today/getTrashCollectionTypes';

export const getNextDayForType = (
  calendar: CalendarEntry,
  type: TrashType,
  year: number,
  month: number, // 1 origin
  dateInMonth: number,
): Date | null => {
  const date = getDateInJst();
  date.setFullYear(year);
  date.setMonth(month - 1);
  date.setDate(dateInMonth + 1);

  let count = 0;
  const countMax = 32;
  while (count < countMax) {
    const collectionTypes = getTrashCollectionTypes(
      calendar,
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
    );
    if (collectionTypes.find((c) => c === type) !== undefined) {
      return date;
    }
    date.setDate(date.getDate() + 1);
    count++;
  }
  return count === countMax ? null : date;
};
