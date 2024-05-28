import { headers } from 'next/headers';
import {
  buildResponseTrashTypeData,
  fromTrashTypeString,
} from '../../../../data/TrashType';
import { getCalendarSource } from '../../../../data/dataSource';
import { buildResponseDateData } from '../../../../date/buildResponseDateData';
import { getDateInJst } from '../../../../date/getDateInJst';
import { getNextDayForType } from './getNextDayForType';

export async function GET(
  request: Request,
  { params }: { params: { id: string; type: string } },
) {
  const trashType = fromTrashTypeString(params.type);
  if (trashType === null) {
    return new Response(`Invalid type - ${params.type}`, {
      status: 403,
    });
  }
  const schedule = getCalendarSource().find(
    (c) => c.area.id === params.id,
  );
  if (schedule === undefined) {
    return new Response(`Invalid area ID - ${params.id}`, {
      status: 403,
    });
  }
  const today = getDateInJst();
  const nextDayForTheType = getNextDayForType(
    schedule,
    trashType,
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate(),
  );
  if (nextDayForTheType === null) {
    return Response.json({
      id: params.id,
      type: params.type,
    });
  }
  const locale = request.headers.get('locale');
  return Response.json({
    id: params.id,
    type: buildResponseTrashTypeData(trashType, locale),
    nextDay: buildResponseDateData(nextDayForTheType),
  });
}
