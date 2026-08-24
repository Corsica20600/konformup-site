import { NextRequest, NextResponse } from "next/server";

const redirectHosts = new Set(["konformup.com", "konformup.fr", "www.konformup.fr"]);

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0].toLowerCase();
  if (host && redirectHosts.has(host)) {
    const target = request.nextUrl.clone();
    target.protocol = "https:";
    target.host = "www.konformup.com";
    return NextResponse.redirect(target, 301);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
