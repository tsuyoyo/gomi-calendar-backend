import { CalendarEntry } from '../../../data/CalendarEntry';
import { RemindDay, Reminder } from '../../../data/Reminder';
import {
  TrashType,
  buildResponseTrashTypeData,
} from '../../../data/TrashType';
import { getDateInJst } from '../../../date/getDateInJst';
import { getStringResource } from '../../../resources/strings';
import { getNextDayForType } from '../next/[type]/getNextDayForType';
import { getTrashCollectionTypes } from '../today/getTrashCollectionTypes';

export const buildReminders = (
  schedule: CalendarEntry,
  locale: string | null,
  remindDay: RemindDay,
): Reminder[] => {
  const today = getDateInJst();
  const remindDays: {
    type: TrashType;
    remindDate: Date;
  }[] = [];

  if (remindDay === 'day-on-the-day') {
    const todayCollection = getTrashCollectionTypes(
      schedule,
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate(),
    );
    todayCollection.forEach((type) => {
      remindDays.push({
        type,
        remindDate: today,
      });
    });
  }

  Object.values(TrashType).forEach((type) => {
    const remindDate = getNextDayForType(
      schedule,
      type,
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate(),
    );
    if (remindDate !== null) {
      remindDays.push({
        type,
        remindDate,
      });
    }
  });

  const reminders = Array<Reminder>();
  remindDays.forEach(({ type, remindDate }) => {
    if (remindDate === null) {
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

    const dateToRemind = remindDate;
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
