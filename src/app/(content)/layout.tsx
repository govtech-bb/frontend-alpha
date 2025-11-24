import { Suspense } from "react";
import { EntryPointWrapper } from "@/components/layout/entry-point-wrapper";

export default function EntryPointLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<main>{children}</main>}>
      <EntryPointWrapper>{children}</EntryPointWrapper>
    </Suspense>
  );
}
