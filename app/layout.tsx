import { Inter } from "next/font/google";
import "./globals.css";
import MetadataService from "../_lib/services/MetadataService";

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
      image: image && image.asset.url,
      url: new URL(`https://${domain}`),
      type: "website",
      locale: "fi_FI",
    },
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
