import { Inter } from "next/font/google";
import "./globals.css";
import MetadataService from "../_lib/services/MetadataService";
import { Analytics } from "@vercel/analytics/react"
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
      image: image.asset.url,
      url: new URL(`https://${domain}`),
      type: "website",
      locale: "fi_FI",
    },
    icons: {
      icon: "/favicon.ico",
      appleTouchIcon: "/apple-touch-icon.png",
      maskIcon: "/safari-pinned-tab.svg",
      msTileImage: "/mstile-150x150.png",
      msTileColor: "#00aba9",
      themeColor: "#ffffff",
      manifest: "/site.webmanifest",
    }
  };
}

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fi">
      <body className={inter.className}>
        {children}
        <GoogleTagManager gtmId='GTM-THJFM6P2' />
      <Analytics mode={'production'}/>
      </body>
    </html>
  );
}
