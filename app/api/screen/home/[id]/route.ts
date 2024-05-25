import { link } from 'fs';
import { CalendarEntry } from '../../../data/CalendarEntry';
import {
  TrashType,
  buildResponseTrashTypeData,
} from '../../../data/TrashType';
import { getCalendarSource } from '../../../data/dataSource';
import { LinkComponent } from '../../../data/screen/common/LinkComponent';
import { HomeComponentType } from '../../../data/screen/home/HomeComponentType';
import { HomeNextComponent } from '../../../data/screen/home/HomeNextComponent';
import { HomeResponse } from '../../../data/screen/home/HomeResponse';
import { HomeTodayComponent } from '../../../data/screen/home/HomeTodayComponent';
import { buildResponseDateData } from '../../../date/buildResponseDateData';
import { getDateInJst } from '../../../date/getDateInJst';
import { getNextDayForType } from '../../../schedule/[id]/next/[type]/getNextDayForType';
import { getTrashCollectionTypes } from '../../../schedule/[id]/today/getTrashCollectionTypes';
import { getLinkByTrashType } from '../../refLinks';

const buildHomeTodayComponent = (
  areaCalendar: CalendarEntry,
): HomeTodayComponent => {
  const today = getDateInJst();
  const todaySchedule = getTrashCollectionTypes(
    areaCalendar,
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate(),
  );
  const todayDisplayDate = `${today.getMonth() + 1}/${today.getDate()}`;
  const trashTypes = todaySchedule
    .map((s) => {
      return { type: s, data: buildResponseTrashTypeData(s) };
    })
    .map(({ type, data }) => {
      return {
        type,
        name: data.displayName,
        link: {
          text: '出し方はこちら',
          url: getLinkByTrashType(type),
        },
      };
    });
  return {
    title: `今日のごみ収集\n(${areaCalendar.area.name})`,
    trashTypes,
  };
};

const buildHomeNextComponent = (
  areaCalendar: CalendarEntry,
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
        trashTypeName: buildResponseTrashTypeData(type).displayName,
        nextDay:
          nextDay !== null ? buildResponseDateData(nextDay) : null,
      };
    })
    .map(({ trashType, trashTypeName, nextDay }) => {
      return {
        type: trashType,
        name: trashTypeName,
        nextDate: nextDay?.displayDate ?? '収集の予定はありません',
        link: {
          text: '出し方はこちら',
          url: getLinkByTrashType(trashType),
        },
      };
    });

  return {
    title: '次のゴミ収集予定',
    trashTypes: nextSchedules,
  };
};

const buildHomeResponse = (
  areaCalendar: CalendarEntry,
): HomeResponse => {
  const todayComponent = buildHomeTodayComponent(areaCalendar);
  const nextComponent = buildHomeNextComponent(areaCalendar);
  const links: LinkComponent[] = [
    {
      title: '令和6年度「家庭ごみの分け方・出し方」冊子',
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
    layout: [
      { type: HomeComponentType.SCHEDULE_TODAY, index: 0 },
      { type: HomeComponentType.SCHEDULE_NEXT, index: 0 },
      { type: HomeComponentType.LINK, index: 0 },
      { type: HomeComponentType.LINK, index: 1 },
    ],
    todayComponents: [todayComponent],
    nextComponents: [nextComponent],
    links,
  };
};

export async function GET(
  _request: Request,
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

  return Response.json(buildHomeResponse(areaCalendar), {
    status: 200,
  });
}