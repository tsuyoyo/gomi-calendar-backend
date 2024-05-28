import { link } from 'fs';
import {
  CalendarEntry,
  TrashSchedule,
} from '../../../data/CalendarEntry';
import {
  TrashType,
  buildResponseTrashTypeData,
} from '../../../data/TrashType';
import { getCalendarSource } from '../../../data/dataSource';
import { LinkComponent } from '../../../data/screen/common/LinkComponent';
import { HomeAreaDateComponent } from '../../../data/screen/home/HomeAreaDateComponent';
import { HomeComponentType } from '../../../data/screen/home/HomeComponentType';
import { HomeNextComponent } from '../../../data/screen/home/HomeNextComponent';
import { HomeResponse } from '../../../data/screen/home/HomeResponse';
import { HomeTodayComponent } from '../../../data/screen/home/HomeTodayComponent';
import {
  HomeWeeklyScheduleComponent,
  HomeWeeklyScheduleTrashTypeInfo,
} from '../../../data/screen/home/HomeWeeklyScheduleComponent';
import { buildDisplayScheduleText } from '../../../date/buildDisplayScheduleText';
import { buildResponseDateData } from '../../../date/buildResponseDateData';
import { getDateInJst } from '../../../date/getDateInJst';
import { getStringResource } from '../../../resources/strings';
import { getNextDayForType } from '../../../schedule/[id]/next/[type]/getNextDayForType';
import { getTrashCollectionTypes } from '../../../schedule/[id]/today/getTrashCollectionTypes';
import { getLinkByTrashType, refLinks } from '../../refLinks';

const buildHomeTodayComponent = (
  areaCalendar: CalendarEntry,
  locale: string | null,
): HomeTodayComponent => {
  const today = getDateInJst();
  const todaySchedule = getTrashCollectionTypes(
    areaCalendar,
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate(),
  );
  const trashTypes = todaySchedule
    .map((s) => {
      return { type: s, data: buildResponseTrashTypeData(s, locale) };
    })
    .map(({ type, data }) => {
      return {
        type,
        name: data.displayName,
        link: {
          text: getStringResource('how-to-take-out-trash', locale),
          url: getLinkByTrashType(type),
        },
      };
    });
  return {
    title: getStringResource('today-collected-trashes', locale),
    trashTypes,
  };
};

const buildHomeNextComponent = (
  areaCalendar: CalendarEntry,
  locale: string | null,
): HomeNextComponent => {
  const today = getDateInJst();
  const nextSchedules = Object.values(TrashType)
    .map((type) => {
      const nextDay = getNextDayForType(
        areaCalendar,
        type,
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate(),
      );
      return {
        trashType: type,
        trashTypeName: buildResponseTrashTypeData(type, locale)
          .displayName,
        nextDay:
          nextDay !== null ? buildResponseDateData(nextDay) : null,
      };
    })
    .map(({ trashType, trashTypeName, nextDay }) => {
      return {
        type: trashType,
        name: trashTypeName,
        nextDate:
          nextDay?.displayDate ??
          getStringResource('no-schedule-to-collect', locale),
        link: {
          text: getStringResource('how-to-take-out-trash', locale),
          url: getLinkByTrashType(trashType),
        },
      };
    });

  return {
    title: getStringResource(
      'next-trash-collection-schedule',
      locale,
    ),
    trashTypes: nextSchedules,
  };
};

const buildWeeklyScheduleComponent = (
  areaCalendar: CalendarEntry,
  locale: string | null,
): HomeWeeklyScheduleComponent => {
  const buildTypeSchedule = (
    type: TrashType,
    trashSchedule: TrashSchedule,
  ): HomeWeeklyScheduleTrashTypeInfo | undefined => {
    return {
      type,
      name: buildResponseTrashTypeData(type, locale).displayName,
      schedule: buildDisplayScheduleText(trashSchedule, locale),
      guideUrl: getLinkByTrashType(type),
    };
  };
  const schedules: HomeWeeklyScheduleTrashTypeInfo[] = [
    buildTypeSchedule(TrashType.BURNABLE, areaCalendar.burnable),
    buildTypeSchedule(
      TrashType.INCOMBUSTIBLE,
      areaCalendar.incombustible,
    ),
    buildTypeSchedule(TrashType.RECYCLABLE, areaCalendar.recyclable),
    buildTypeSchedule(TrashType.HARMFUL, areaCalendar.harmful),
  ].filter(
    (s) => s !== undefined,
  ) as HomeWeeklyScheduleTrashTypeInfo[];

  return {
    title: getStringResource('weekly-schedule-title', locale),
    description: getStringResource(
      'weekly-schedule-description',
      locale,
    ),
    calendarLink: {
      title: getStringResource(
        'weekly-schedule-open-calendar',
        locale,
      ),
      url: refLinks.calendarTop,
      // areaCalendar.calendar,
    },
    schedules,
  };
};

const buildHomeResponse = (
  areaCalendar: CalendarEntry,
  locale: string | null,
): HomeResponse => {
  const today = getDateInJst();
  const areaDateComponent: HomeAreaDateComponent = {
    area: areaCalendar.area.name,
    date: `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`,
  };
  const todayComponent = buildHomeTodayComponent(
    areaCalendar,
    locale,
  );
  const nextComponent = buildHomeNextComponent(areaCalendar, locale);
  const weeklyScheduleComponents = buildWeeklyScheduleComponent(
    areaCalendar,
    locale,
  );
  const links: LinkComponent[] =
    locale === 'en'
      ? [
          {
            title: 'Narashino City Homepage',
            url: 'https://www.city.narashino.lg.jp/index.html',
          },
        ]
      : [
          {
            title: '令和6年度「家庭ごみの分け方・出し方」',
            description:
              '毎年市内全世帯を対象に、自宅のポストに配布されているものと同じです',
            url: 'https://www.city.narashino.lg.jp/kurashi/gomi/gomi/reiwa6nendosassi.html',
          },
          {
            title: 'ごみの出し方50音別分類表',
            url: 'https://www.city.narashino.lg.jp/kurashi/gomi/gomi/gomi_dashikata50/index.html',
          },
        ];

  return {
    layout:
      locale === 'en'
        ? [
            { type: HomeComponentType.AREA_DATE, index: 0 },
            { type: HomeComponentType.SCHEDULE_TODAY, index: 0 },
            { type: HomeComponentType.SCHEDULE_NEXT, index: 0 },
            { type: HomeComponentType.WEEKLY_SCHEDULE, index: 0 },
            { type: HomeComponentType.LINK, index: 0 },
          ]
        : [
            { type: HomeComponentType.AREA_DATE, index: 0 },
            { type: HomeComponentType.SCHEDULE_TODAY, index: 0 },
            { type: HomeComponentType.SCHEDULE_NEXT, index: 0 },
            { type: HomeComponentType.WEEKLY_SCHEDULE, index: 0 },
            { type: HomeComponentType.LINK, index: 0 },
            { type: HomeComponentType.LINK, index: 1 },
          ],
    areaDateComponent: [areaDateComponent],
    todayComponents: [todayComponent],
    weeklyScheduleComponents: [weeklyScheduleComponents],
    nextComponents: [nextComponent],
    links,
  };
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  const areaCalendar = getCalendarSource().find(
    (s) => s.area.id === id,
  );
  if (areaCalendar === undefined) {
    return new Response(`Invalid area ID - ${id}`, {
      status: 403,
    });
  }
  const locale = request.headers.get('locale');
  return Response.json(buildHomeResponse(areaCalendar, locale), {
    status: 200,
  });
}
