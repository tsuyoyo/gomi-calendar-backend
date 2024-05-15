import { getDateInJst } from '../../date/getDateInJst';

export const getNthWeekdayInThisMonth = (dateInMonth: number) => {
  const today = getDateInJst();
  const year = today.getFullYear();
  const month = today.getMonth();

  return getNthWeekdayInTheMonth(year, month, dateInMonth);
};

/**
 * Returns "N" th week day in the month.
 * It's 1 origin.
 *
 * @param year
 * @param month
 * @param dateInMonth
 * @returns
 */
export const getNthWeekdayInTheMonth = (
  year: number,
  month: number, // 1 origin
  dateInMonth: number,
) => {
  if (month < 1 || month > 12) {
    throw new Error(
      `month = ${month}: Invalid arguments to getNthWeekdayInTheMonth`,
    );
  }
  const targetDate = new Date(year, month - 1, dateInMonth);
  const targetDay = targetDate.getDay();

  const date = new Date(year, month - 1, 1);
  let count = 0;
  while (
    date.getDate() <= dateInMonth &&
    date.getMonth() === month - 1
  ) {
    if (date.getDay() === targetDay) {
      count++;
    }
    date.setDate(date.getDate() + 1);
  }

  return count;
};
