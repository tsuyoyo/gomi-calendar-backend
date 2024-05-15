import { calendarSource } from '../../data/dataSource';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const schedule = calendarSource.find(
    (c) => c.area.id === params.id,
  );
  if (schedule === undefined) {
    return new Response(`Invalid area ID - ${params.id}`, {
      status: 403,
    });
  }
  return Response.json(schedule);
}
