import { textVariants } from "@govtech-bb/react";
import type { Metadata } from "next";
import { figtree } from "@/lib/fonts";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";
import { Analytics } from "@/components/analytics";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SiteChrome } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: {
    template: "%s | The Government Of Barbados",
    default: "The Government Of Barbados", // a default is required when creating a template
  },
  description:
    "Access official Barbados government services online — apply for passports, birth certificates, driver's licences, and more at alpha.gov.bb.",
  robots: {
    index: process.env.ALLOW_INDEXING === "true",
    follow: process.env.ALLOW_INDEXING === "true",
  },
  openGraph: {
    siteName: "Government of Barbados",
    locale: "en_BB",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Government of Barbados",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="bg-blue-100" lang="en">
      <body
        className={`${figtree.variable} ${textVariants({ size: "body" })} grid min-h-screen grid-rows-[auto_1fr_auto] bg-white-00 font-sans antialiased`}
      >
        <SiteChrome footer={<Footer />} header={<Header />}>
          {children}
        </SiteChrome>
      </body>
      <Analytics />
    </html>
  );
}
