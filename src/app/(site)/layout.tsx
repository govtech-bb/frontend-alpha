import { EntryPointWrapper } from "@/components/layout/entry-point-wrapper";

export default function EntryPointLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <EntryPointWrapper>{children}</EntryPointWrapper>;
}
