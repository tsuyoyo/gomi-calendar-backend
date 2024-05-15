import {
  TrashType,
  fromTrashTypeString,
} from '../../../../data/TrashType';
import { calendarSource } from '../../../../data/dataSource';
import { getDateInJst } from '../../../../date/getDateInJst';
import { toJst } from '../../../../date/toJst';
import { getNextDayForType } from './getNextDayForType';

export async function GET(
  _request: Request,
  { params }: { params: { id: string; type: string } },
) {
  const trashType = fromTrashTypeString(params.type);
  if (trashType === null) {
    return new Response(`Invalid type - ${params.type}`, {
      status: 403,
    });
  }
  const schedule = calendarSource.find(
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
  return Response.json({
    id: params.id,
    type: params.type,
    nextDay: nextDayForTheType,
  });
}
