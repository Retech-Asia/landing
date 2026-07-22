import { NextResponse } from "next/server";

/** Simple health-check endpoint for uptime monitoring. */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
}
