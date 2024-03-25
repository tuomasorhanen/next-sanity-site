import { Gideon_Roman } from "next/font/google";
import "./globals.css";
import MetadataService from "../_lib/services/MetadataService";
import { Analytics } from "@vercel/analytics/react";
import { GoogleTagManager } from "@next/third-parties/google";
import { Viewport } from "next";

export async function generateMetadata() {
  const metadataService = new MetadataService();
  const pageMetadata = await metadataService.FetchDefaultMetadata();
  const { title, description, image, domain, keywords } = pageMetadata;

  return {
    title: title,
    metadataBase: new URL(`https://${domain}`),
    alternates: {
      canonical: '/',
    },
    description: description,
    robots: {
      index: true,
      follow: true
    },    
    keywords: keywords.join(", "),
    openGraph: {
      title: title,
      description: description,
      images: [{
        url: image.asset.url,
        width: 800,
        height: 600,
        alt: title,
      }],      url: new URL(`https://${domain}`),
      type: "website",
      locale: "fi_FI",
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '16x16', type: 'image/x-icon' },
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        { url: '/mstile-144x144.png', sizes: '144x144', type: 'image/png' },
      ],
    },
    manifest: '/site.webmanifest',
    generator: 'Next.js',
    applicationName: 'Fysiosarianne',
    author: {
      name: 'Tuomas Orhanen',
      url: 'https://github.com/tuomasorhanen'
    },
    publisher: {
      name: 'Tuomas Orhanen',
      url: 'https://github.com/tuomasorhanen'
    },
  };
}

export const viewport: Viewport = {
  themeColor: 'white',
}

const gideon = Gideon_Roman({
  weight: '400',
  subsets: ['latin'],
  style: "normal",
  display: "auto",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fi">
      <body className={gideon.className}>
        {children}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        )}
        <Analytics mode={"production"} />
      </body>
    </html>
  );
}
