import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import "./overrides.css";
import "./redesign.css";
import "./logo-sizing.css";

import { site } from "@/lib/site-config";
const sans = Manrope({ subsets:["latin"], variable:"--font-sans" });
const serif = Playfair_Display({ subsets:["latin"], variable:"--font-serif" });

export const metadata: Metadata = { metadataBase: new URL(site.url), title:{default:"Konform’up | Formations SST, hygiène & IA", template:"%s | Konform’up"}, description:site.description, alternates:{canonical:"/"}, openGraph:{type:"website",locale:"fr_FR",siteName:"Konform’up",title:"Konform’up — Former pour agir, prévenir et progresser",description:site.description,url:site.url}, twitter:{card:"summary_large_image"}, robots:{index:true,follow:true}, icons:{icon:"/favicon.ico"} };

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
