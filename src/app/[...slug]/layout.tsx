import { BackButton } from "@/components/layout/back-button";
import { HelpfulBox } from "@/components/layout/helpful-box";

export default function EntryPointLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container py-4 lg:pt-6">
      <BackButton />
      {children}
      <HelpfulBox />
    </div>
  );
}
