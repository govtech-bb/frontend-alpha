import Script from "next/script";

export default function TellUsPage() {
  return (
    <main className="container pt-4 pb-8 lg:py-8">
      <iframe
        className="m-0 border-none"
        data-tally-src="https://tally.so/embed/Bzdl5Y?alignLeft=1&transparentBackground=1&dynamicHeight=1"
        height="1633"
        loading="lazy"
        title="Help Us Improve Government Services in Barbados"
        width="100%"
      />
      <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" />
    </main>
  );
}
