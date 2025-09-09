import type { Metadata } from "next";
import { figtree } from "@/lib/fonts";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "GovTech Barbados Alpha",
  description: "A project by the GovTech Barbados team",
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
        className={`${figtree.variable} grid min-h-screen grid-rows-[auto_1fr_auto] antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
