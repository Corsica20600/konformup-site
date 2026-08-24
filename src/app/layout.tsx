import type { Metadata } from "next";
import { Nunito_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import "./overrides.css";
import "./redesign.css";
import "./logo-sizing.css";
import "./pastel-redesign.css";

import { site } from "@/lib/site-config";
const sans = Nunito_Sans({ subsets:["latin"], variable:"--font-sans" });
const serif = Playfair_Display({ subsets:["latin"], variable:"--font-serif" });

export const metadata: Metadata = { metadataBase: new URL(site.url), title:{default:"Konform’up | Formations SST, hygiène & IA", template:"%s | Konform’up"}, description:site.description, openGraph:{type:"website",locale:"fr_FR",siteName:"Konform’up",title:"Konform’up — Former pour agir, prévenir et progresser",description:site.description,url:site.url}, twitter:{card:"summary_large_image"}, robots:{index:true,follow:true}, manifest:"/site.webmanifest", icons:{icon:[{url:"/favicon.ico"},{url:"/favicon-16x16.png",sizes:"16x16",type:"image/png"},{url:"/favicon-32x32.png",sizes:"32x32",type:"image/png"},{url:"/favicon-48x48.png",sizes:"48x48",type:"image/png"}],shortcut:"/favicon.ico",apple:"/apple-touch-icon.png"} };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${sans.variable} ${serif.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
