import type { Metadata } from "next";
import { figtree } from "@/lib/fonts";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { HelpfulBox } from "@/components/layout/helpful-box";

export const metadata: Metadata = {
  title: "GovTech Barbados Alpha",
  description: "A project by the GovTech Barbados team",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "none",
      "max-snippet": -1,
    },
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
        <script
          data-website-id="7b38820e-0363-41c7-8a85-c55ed60ad898"
          defer
          src="https://cloud.umami.is/script.js"
        />
      </head>
      <body
        className={`${figtree.variable} grid min-h-screen grid-rows-[auto_1fr_auto_auto] antialiased`}
      >
        <Header />
        {children}
        <HelpfulBox />
        <Footer />
      </body>
    </html>
  );
}
