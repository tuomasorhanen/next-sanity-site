import { Inter } from "next/font/google";
import "./globals.css";
import MetadataService from "../_lib/services/MetadataService";
import { Analytics } from "@vercel/analytics/react"
import Head from "next/head";

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
    <>
    <Head>
    <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-THJFM6P2');` }} />
    </Head>
    <html lang="fi">
      <body className={inter.className}>
      <div dangerouslySetInnerHTML={{ __html: `
            <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-THJFM6P2" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
          `}} />
        {children}
      <Analytics/>
      </body>
    </html>
    </>
  );
}
