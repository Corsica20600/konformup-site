import { NextResponse } from "next/server";
/** Domain redirects are configured in Vercel; do not intercept App Router flight requests. */
export function middleware() {
  return NextResponse.next();
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
