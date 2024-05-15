import { TrashType } from '../../../data/TrashType';
import { getCalendarSource } from '../../../data/dataSource';
import { getDateInJst } from '../../../date/getDateInJst';
import { getNextDayForType } from './[type]/getNextDayForType';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const schedule = getCalendarSource().find(
    (c) => c.area.id === params.id,
  );
  if (schedule === undefined) {
    return new Response(`Invalid area ID - ${params.id}`, {
      status: 403,
    });
  }
  const today = getDateInJst();
  return Response.json({
    id: params.id,
    nextDays: Object.values(TrashType).map((type) => {
      const nextDay = getNextDayForType(
        schedule,
        type,
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate(),
      );
      return {
        type,
        nextDay: nextDay !== null ? nextDay : null,
      };
    }),
  });
}
