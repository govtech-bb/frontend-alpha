import { BackButton } from "@/components/layout/back-button";
import { HelpfulBox } from "@/components/layout/helpful-box";

export default function EntryPointLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full space-y-4 rounded-t-3xl bg-white">
      <BackButton className="px-4 pt-6" />
      {children}
      <HelpfulBox />
    </div>
  );
}
