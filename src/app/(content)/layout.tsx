import { EntryPointWrapper } from "@/components/layout/entry-point-wrapper";
import { StageBanner } from "@/components/stage-banner";

export default function EntryPointLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full overflow-x-clip bg-white-00">
      <div className="bg-blue-10 print:hidden">
        <div className="container">
          <StageBanner stage="alpha" />
        </div>
      </div>
      <EntryPointWrapper>{children}</EntryPointWrapper>
    </div>
  );
}
