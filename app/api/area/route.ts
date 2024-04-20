import { NextRequest, NextResponse } from 'next/server';
import { calendarSource } from '../data/dataSource';

export function GET(request: NextRequest): NextResponse {
  const d = calendarSource;

  return NextResponse.json({ message: `aaaaaaa` }, { status: 200 });
}
