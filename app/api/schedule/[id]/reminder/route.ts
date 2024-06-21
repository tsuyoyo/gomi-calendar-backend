import { NextRequest } from 'next/server';
import { RemindDay } from '../../../data/Reminder';
import { getCalendarSource } from '../../../data/dataSource';
import { buildReminders } from './buildReminders';

export async function GET(
  request: NextRequest,
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
  const remindDay =
    request.nextUrl.searchParams.get('remind-day') ??
    'day-on-the-day';

  return Response.json({
    reminders: buildReminders(
      areaCalendar,
      locale,
      remindDay as RemindDay,
    ),
  });
}
