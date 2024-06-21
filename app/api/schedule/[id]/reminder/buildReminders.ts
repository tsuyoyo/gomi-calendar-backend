import { CalendarEntry } from '../../../data/CalendarEntry';
import { RemindDay, Reminder } from '../../../data/Reminder';
import {
  TrashType,
  buildResponseTrashTypeData,
} from '../../../data/TrashType';
import { getDateInJst } from '../../../date/getDateInJst';
import { getStringResource } from '../../../resources/strings';
import { getNextDayForType } from '../next/[type]/getNextDayForType';

export const buildReminders = (
  schedule: CalendarEntry,
  locale: string | null,
  remindDay: RemindDay,
): Reminder[] => {
  const nextDays = Object.values(TrashType).map((type) => {
    const today = getDateInJst();
    return {
      type,
      nextDay: getNextDayForType(
        schedule,
        type,
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate(),
      ),
    };
  });

  const reminders = Array<Reminder>();
  nextDays.forEach(({ type, nextDay }) => {
    if (nextDay === null) {
      return;
    }
    const displayTrashType = buildResponseTrashTypeData(
      type,
      locale,
    ).displayName;

    const title =
      remindDay === 'day-before'
        ? locale === 'en'
          ? `${displayTrashType} is collected tomorrow.`
          : `明日は${displayTrashType}の収集日です。`
        : locale === 'en'
          ? `${displayTrashType} is collected today.`
          : `今日は${displayTrashType}の収集日です。`;

    const dateToRemind = nextDay;
    if (remindDay === 'day-before') {
      dateToRemind.setDate(dateToRemind.getDate() - 1);
    }

    reminders.push({
      type,
      title,
      message: getStringResource('reminder-message', locale),
      year: dateToRemind.getFullYear(),
      month: dateToRemind.getMonth() + 1,
      date: dateToRemind.getDate(),
    });
  });
  return reminders;
};
