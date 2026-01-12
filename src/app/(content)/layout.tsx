import { Suspense } from "react";
import { EntryPointWrapper } from "@/components/layout/entry-point-wrapper";
import { StageBanner } from "@/components/stage-banner";

export default function EntryPointLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="bg-blue-10">
        <div className="container">
          <StageBanner stage="alpha" />
        </div>
      </div>
      <Suspense fallback={<div className="container">{children}</div>}>
        <EntryPointWrapper>{children}</EntryPointWrapper>
      </Suspense>
    </main>
  );
}
