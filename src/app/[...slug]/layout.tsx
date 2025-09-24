import Breadcrumb from "@/components/layout/breadcrumb-navigation";

export default function DynamicPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#FFC726]">
      <div className="h-full rounded-t-3xl bg-white">
        <Breadcrumb />
        {children}
      </div>
    </div>
  );
}
