import { Gideon_Roman } from "next/font/google";
import "./globals.css";
import MetadataService from "../_lib/services/MetadataService";
import { Analytics } from "@vercel/analytics/react";
import { GoogleTagManager } from "@next/third-parties/google";

export async function generateMetadata() {
  const metadataService = new MetadataService();
  const pageMetadata = await metadataService.FetchDefaultMetadata();
  const { title, description, image, domain, keywords } = pageMetadata;

  return {
    title: title,
    metadataBase: new URL(`https://${domain}`),
    description: description,
    robots: "index, follow",
    keywords: keywords.join(", "),
    openGraph: {
      title: title,
      description: description,
      images: image.asset.url,
      url: new URL(`https://${domain}`),
      type: "website",
      locale: "fi_FI",
    },
    icons: {
      icon: "/favicon.ico",
      themeColor: "#ffffff",
    },
  };
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
