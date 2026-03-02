import { Button, Heading } from "@govtech-bb/react";

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

          <ul className="space-y-s">
            <li>Check the web address for typos</li>
            <li>Return to the homepage</li>
            <li>Browse our services directory</li>
          </ul>
        </div>

        {/* Quick Link Buttons */}
        <div className="flex flex-col gap-xm md:flex-row">
          <Button
            asChild
            children={<a href="/(content)">Browse service directory</a>}
            variant="secondary"
          />
          <Button
            asChild
            children={<a href="/">Return to Homepage</a>}
            variant="primary"
          />
        </div>
      </div>
    </div>
  );
}
