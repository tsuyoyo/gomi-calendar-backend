import { NextRequest, NextResponse } from "next/server";
import { calendarSource } from "../../data/datasource";

export function GET(request: NextRequest): NextResponse {
    console.log('loading calendar'); 
    const d = calendarSource;
    console.log('loaded calendar');
    return NextResponse.json(
        { message: `aaaaaaa` },
        { status: 200 },
      );
}