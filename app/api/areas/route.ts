import { NextRequest, NextResponse } from 'next/server';
import { calendarSource } from '../data/dataSource';

export function GET(request: NextRequest): NextResponse {
  const { searchParams } = new URL(request.url);
  searchParams.get('id');
  return NextResponse.json(
    { areas: calendarSource.map((c) => c.area) },
    { status: 200 },
  );
}
