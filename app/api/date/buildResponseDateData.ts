import { daysOfWeek } from '../data/Week';

export const buildResponseDateData = (date: Date) => {
  return {
    iso_8601: date,
    displayDate: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} (${daysOfWeek[date.getDay()]})`,
  };
};
