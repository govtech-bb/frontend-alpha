import { BackButton } from "@/components/layout/back-button";
import { HelpfulBox } from "@/components/layout/helpful-box";

export default function EntryPointLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-yellow-100">
      <div className="rounded-t-3xl bg-neutral-white">
        <div className="container space-y-8 overflow-hidden pt-4">
          <BackButton />
          {children}

          <HelpfulBox />
        </div>
      </div>
    </div>
  );
}
