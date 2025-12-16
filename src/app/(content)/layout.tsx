import { Suspense } from "react";
import { EntryPointWrapper } from "@/components/layout/entry-point-wrapper";

export default function EntryPointLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<main className="container">{children}</main>}>
      <EntryPointWrapper>{children}</EntryPointWrapper>
    </Suspense>
  );
}
