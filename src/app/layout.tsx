import type { Metadata } from "next";
import { figtree } from "@/lib/fonts";
import "./globals.css";
import { Analytics } from "@/components/analytics";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { OrganizationSchema } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "The Government of Barbados",
  description: "The best place to access official government services",
  metadataBase: new URL("https://alpha.gov.bb"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_BB",
    url: "https://alpha.gov.bb",
    siteName: "Government of Barbados",
    title: "The Government of Barbados",
    description: "The best place to access official government services",
  },
  twitter: {
    card: "summary",
    title: "The Government of Barbados",
    description: "The best place to access official government services",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <OrganizationSchema />
      </head>
      <body
        className={`${figtree.variable} grid min-h-screen grid-rows-[auto_1fr_auto] bg-yellow-bright font-sans antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
      <Analytics />
    </html>
  );
}
