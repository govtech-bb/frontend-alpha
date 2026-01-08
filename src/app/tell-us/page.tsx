import { notFound } from "next/navigation";
import Script from "next/script";

import { hasResearchAccess } from "@/lib/research-access";

export default async function TellUsPage() {
  const hasAccess = await hasResearchAccess();

  if (!hasAccess) {
    notFound();
  }

  return (
    <main className="container pt-4 pb-8 lg:py-8">
      <iframe
        className="m-0 border-none"
        data-tally-src="https://tally.so/embed/Pd1ele?alignLeft=1&transparentBackground=1&dynamicHeight=1"
        height="1633"
        loading="lazy"
        title="Help Us Improve Government Services in Barbados"
        width="100%"
      />
      <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" />
    </main>
  );
}
