import { calendarSource } from '../../../data/dataSource';
import { getDateInJst } from '../../../date/getDateInJst';
import { getTrashCollectionTypes } from './getTrashCollectionTypes';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  const areaCalendar = calendarSource.find((s) => s.area.id === id);
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
    ),
  });
}
