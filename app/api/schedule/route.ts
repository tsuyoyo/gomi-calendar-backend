import { getCalendarSource } from '../data/dataSource';

export function GET(_request: Request) {
  return Response.json(getCalendarSource());
}
