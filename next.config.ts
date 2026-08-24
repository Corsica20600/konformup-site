import type { NextConfig } from "next";

const nextConfig: NextConfig = { distDir: process.env.NEXT_DIST_DIR || ".next", async headers(){return [{source:"/:path*",headers:[{key:"X-Content-Type-Options",value:"nosniff"},{key:"Referrer-Policy",value:"strict-origin-when-cross-origin"},{key:"X-Frame-Options",value:"SAMEORIGIN"},{key:"Permissions-Policy",value:"camera=(), microphone=(), geolocation=()"},{key:"Content-Security-Policy",value:"default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self'; script-src 'self'; connect-src 'self' https://api.brevo.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self'"}]}]}};

export default nextConfig;
