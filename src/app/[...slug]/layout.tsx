import Breadcrumb from "@/components/layout/breadcrumb-navigation";
import { HelpfulBox } from "@/components/layout/helpful-box";

export default function DynamicPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#FFC726]">
      <Breadcrumb />
      <div className="h-full rounded-t-3xl bg-white">
        {children}
        <HelpfulBox />
      </div>
    </div>
  );
}
