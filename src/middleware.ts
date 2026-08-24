import { NextResponse, type NextRequest } from "next/server";
export function middleware(request:NextRequest){const host=request.headers.get("host")?.toLowerCase().split(":")[0]; if(host&&["konformup.com","konformup.fr","www.konformup.fr"].includes(host)){const url=new URL(request.url);url.protocol="https:";url.host="www.konformup.com";return NextResponse.redirect(url,308)}return NextResponse.next()}
export const config={matcher:["/:path*"]};
