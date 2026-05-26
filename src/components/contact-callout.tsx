import { Heading, Link, LinkButton, Text } from "@govtech-bb/react";
import { CircleAlert } from "lucide-react";
import NextLink from "next/link";
import { Fragment, type ReactNode } from "react";

interface ContactCalloutProps {
  /** Organisation or service name shown as the heading. */
  title: string;
  /** Physical address, shown as plain text. */
  address?: string;
  /** Phone number with its display text and `tel:` href. */
  phone?: { display: string; href: string };
  /** Email address — rendered as a `mailto:` link. */
  email?: string;
  /** Website with display text (e.g. the bare domain) and full href. */
  website?: { display: string; href: string };
  /** Optional supporting sentence shown below the contact details. */
  children?: ReactNode;
  /** Optional call-to-action button (e.g. a "Call" link). */
  action?: { label: string; href: string };
}

/**
 * A highlighted contact card for a government service or agency: name, inline
 * contact details separated by middots, an optional supporting line, and an
 * optional call-to-action button.
 */
export const ContactCallout = ({
  title,
  address,
  phone,
  email,
  website,
  children,
  action,
}: ContactCalloutProps) => {
  const details: Array<{ key: string; node: ReactNode }> = [];

  if (address) {
    details.push({ key: "address", node: address });
  }
  if (phone) {
    details.push({
      key: "phone",
      node: (
        <a className="font-bold text-black-00" href={phone.href}>
          {phone.display}
        </a>
      ),
    });
  }
  if (email) {
    details.push({
      key: "email",
      node: <Link href={`mailto:${email}`}>{email}</Link>,
    });
  }
  if (website) {
    details.push({
      key: "website",
      node: (
        <Link as={NextLink} external href={website.href}>
          {website.display}
        </Link>
      ),
    });
  }

  return (
    <div className="flex flex-col gap-s rounded-xl border border-blue-40 bg-blue-10 p-xm sm:flex-row sm:items-center sm:gap-xm">
      <CircleAlert
        aria-hidden="true"
        className="size-8 shrink-0 self-start text-blue-100 sm:self-center"
      />
      <div className="flex-1 space-y-xs">
        <Heading as="h2" size="h5">
          {title}
        </Heading>
        {details.length > 0 && (
          <Text as="p" size="body">
            {details.map((detail, index) => (
              <Fragment key={detail.key}>
                {index > 0 && <span aria-hidden="true">{" · "}</span>}
                {detail.node}
              </Fragment>
            ))}
          </Text>
        )}
        {children && (
          <Text as="p" size="body">
            {children}
          </Text>
        )}
      </div>
      {action && (
        <LinkButton className="shrink-0" href={action.href}>
          {action.label}
        </LinkButton>
      )}
    </div>
  );
};
