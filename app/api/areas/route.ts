import { getCalendarSource } from '../data/dataSource';

export function GET(request: Response) {
  const { searchParams } = new URL(request.url);
  searchParams.get('id');
  return Response.json(
    { areas: getCalendarSource().map((c) => c.area) },
    { status: 200 },
  );
}
