import { BackButton } from "@/components/layout/back-button";
import { HelpfulBox } from "@/components/layout/helpful-box";

export default function EntryPointLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-yellow-bright">
      <div className="overflow-hidden bg-white lg:rounded-t-3xl">
        <div className="container lg:space-y-16">
          <BackButton className="py-6" />
          {children}
          <HelpfulBox />
        </div>
      </div>
    </div>
  );
}
