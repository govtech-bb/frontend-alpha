import Breadcrumb from "@/components/layout/breadcrumb-navigation";
import { HelpfulBox } from "@/components/layout/helpful-box";

export default function EntryPointLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full space-y-4 rounded-t-3xl bg-white">
      <Breadcrumb className="px-4 pt-6" />
      {children}
      <HelpfulBox />
    </div>
  );
}
