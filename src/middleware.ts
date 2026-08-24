import { NextResponse, type NextRequest } from "next/server";
/** Domain redirects are configured in Vercel; do not intercept App Router flight requests. */
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
