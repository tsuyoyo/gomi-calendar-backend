import { buildResponseTrashTypeData } from '../../../data/TrashType';
import { getCalendarSource } from '../../../data/dataSource';
import { getDateInJst } from '../../../date/getDateInJst';
import { getTrashCollectionTypes } from './getTrashCollectionTypes';

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

  const today = getDateInJst();
  return Response.json({
    data: getTrashCollectionTypes(
      areaCalendar,
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate(),
    ).map((t) => buildResponseTrashTypeData(t)),
  });
}
