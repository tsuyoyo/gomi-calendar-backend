import { NextRequest, NextResponse } from 'next/server';
import { getCalendarSource } from '../data/dataSource';

export function GET(request: NextRequest): NextResponse {
  const { searchParams } = new URL(request.url);
  searchParams.get('id');
  return NextResponse.json(
    { areas: getCalendarSource().map((c) => c.area) },
    { status: 200 },
  );
}
