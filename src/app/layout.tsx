import type { Metadata } from "next";
import { figtree } from "@/lib/fonts";
import "./globals.css";
import { Analytics } from "@/components/analytics";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: {
    template: "%s | The Government Of Barbados",
    default: "The Government Of Barbados", // a default is required when creating a template
  },
  description: "The best place to access official government services",
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
    <html className="bg-blue-100" lang="en">
      <body
        className={`${figtree.variable} grid min-h-screen grid-rows-[auto_1fr_auto] bg-neutral-white font-sans antialiased`}
      >
        <Header />
        {children}
        {/* <Footer /> */}
      </body>
      <Analytics />
    </html>
  );
}
