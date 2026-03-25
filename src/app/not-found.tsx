import { Heading, LinkButton } from "@govtech-bb/react";

export default function NotFound() {
  return (
    <div className="container">
      <div className="w-full space-y-m bg-white-00 py-m md:py-l">
        {/* Header */}
        <div className="space-y-m">
          <Heading as="h1">We couldn't find that page</Heading>
          <p className="md:max-w-2/3">
            The page you’re looking for may have been moved, removed, or the
            address may have been typed incorrectly.
          </p>
        </div>

        {/* Suggestions */}
        <div className="space-y-s">
          <Heading as="h3">Suggestions:</Heading>

          <ul className="list-disc space-y-s pl-7.5">
            <li>Check the web address for typos</li>
            <li>Return to the homepage</li>
            <li>Browse our services directory</li>
          </ul>
        </div>

        {/* Quick Link Buttons */}
        <div className="flex flex-col gap-xm md:flex-row">
          <LinkButton href="/services" variant="secondary">
            Browse service directory
          </LinkButton>
          <LinkButton href="/" variant="primary">
            Return to homepage
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
