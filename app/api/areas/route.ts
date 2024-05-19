import { getCalendarSource } from '../data/dataSource';

export function GET(_request: Request) {
  return Response.json(
    { areas: getCalendarSource().map((c) => c.area) },
    { status: 200 },
  );
}
