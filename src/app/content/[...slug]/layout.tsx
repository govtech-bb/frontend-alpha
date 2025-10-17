import { BackButton } from "@/components/layout/back-button";
import { HelpfulBox } from "@/components/layout/helpful-box";

export default function EntryPointLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="overflow-hidden bg-neutral-white lg:rounded-t-3xl">
      <div className="container lg:space-y-16">
        <BackButton className="py-6 lg:pb-0" />
        {children}
        <HelpfulBox />
      </div>
    </div>
  );
}
