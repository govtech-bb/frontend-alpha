import { Heading, LinkButton } from "@govtech-bb/react";

export function NoScriptMessage() {
  return (
    <div className="container">
      <div className="w-full space-y-m bg-white-00 py-m md:max-w-2/3 md:py-l">
        <div className="space-y-m">
          <Heading as="h1">This page needs JavaScript to work properly</Heading>
          <p>
            JavaScript is currently turned off in your browser, or your browser
            doesn't support it.
          </p>
        </div>

        <div className="space-y-s">
          <Heading as="h3">Suggestions:</Heading>
          <ul className="list-disc space-y-s pl-7.5">
            <li>
              Turn on JavaScript in your browser settings. The steps differ by
              browser, but you'll usually find the option under Settings →
              Privacy and Security, or Site Settings. Once it's on, refresh this
              page.
            </li>
            <li>
              Try a different browser. Most up-to-date browsers (Chrome, Safari,
              Firefox, Edge) support JavaScript by default.
            </li>
            <li>
              Update your browser. If you're using an older version, updating
              may resolve the issue.
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-xm md:flex-row">
          {/* <LinkButton href="#" variant="secondary">
            Contact us
          </LinkButton> */}
          <LinkButton href="/" variant="primary">
            Return to homepage
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
