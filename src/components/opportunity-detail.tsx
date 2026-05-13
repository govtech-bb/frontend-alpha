import { Heading, Link, LinkButton, Text } from "@govtech-bb/react";
import NextLink from "next/link";
import type { Opportunity } from "@/app/youth/opportunities/_components/opportunities-list";

function formatAgeRange(ageMin?: number, ageMax?: number): string | null {
  if (ageMin != null && ageMax != null) return `Ages ${ageMin}–${ageMax}`;
  if (ageMin != null) return `${ageMin}+ years`;
  if (ageMax != null) return `Up to ${ageMax} years`;
  return null;
}

export function OpportunityDetail({
  opportunity,
  applyHref,
}: {
  opportunity: Opportunity;
  applyHref: string;
}) {
  const ageRange = formatAgeRange(
    opportunity.eligibility?.ageMin,
    opportunity.eligibility?.ageMax
  );
  const interests = opportunity.eligibility?.interests ?? [];
  const eligibilityItems = [
    ageRange,
    interests.length > 0 ? `Interest in ${interests.join(", ")}` : null,
  ].filter(Boolean) as string[];

  const externalLink = opportunity.applyUrl ?? opportunity.url;

  return (
    <article className="max-w-2xl space-y-m">
      <header className="space-y-xs">
        <Heading as="h1">{opportunity.title}</Heading>
        {opportunity.summary && <Text as="p">{opportunity.summary}</Text>}
      </header>

      <section className="space-y-xs">
        <Heading as="h2">Overview</Heading>
        <Text as="p">{opportunity.description}</Text>
      </section>

      {eligibilityItems.length > 0 && (
        <section className="space-y-xs">
          <Heading as="h2">Who can apply</Heading>
          <ul className="list-disc space-y-xs ps-m">
            {eligibilityItems.map((item) => (
              <li key={item}>
                <Text as="span">{item}</Text>
              </li>
            ))}
          </ul>
        </section>
      )}

      {opportunity.subProgrammes && opportunity.subProgrammes.length > 0 && (
        <section className="space-y-xs">
          <Heading as="h2">Sub-programmes</Heading>
          <ul className="space-y-s">
            {opportunity.subProgrammes.map((sub) => (
              <li
                className="border-grey-00 border-l-4 bg-blue-10 p-s"
                key={sub.name}
              >
                <Heading as="h3">{sub.name}</Heading>
                <Text as="p">{sub.description}</Text>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="space-y-xs">
        <Heading as="h2">How to apply</Heading>
        <Text as="p">
          Complete the short application form to register your interest. Your
          progress is saved automatically.
        </Text>
        <div className="pt-2">
          <LinkButton as={NextLink} href={applyHref} variant="primary">
            Apply now
          </LinkButton>
        </div>
      </section>

      {externalLink && (
        <section className="space-y-xs pb-m">
          <Heading as="h2">More information</Heading>
          <Text as="p">
            <Link
              as={NextLink}
              href={externalLink}
              rel="noopener"
              target="_blank"
            >
              {`Go to the official site for ${opportunity.title}`}
            </Link>
          </Text>
        </section>
      )}

      {opportunity.contact && (
        <section className="space-y-xs">
          <Heading as="h2">Contact</Heading>
          <ul className="space-y-xs">
            {opportunity.contact.email && (
              <li>
                <Text as="span">Email: </Text>
                <Link
                  as={NextLink}
                  href={`mailto:${opportunity.contact.email}`}
                >
                  {opportunity.contact.email}
                </Link>
              </li>
            )}
            {opportunity.contact.phone && (
              <li>
                <Text as="span">Phone: {opportunity.contact.phone}</Text>
              </li>
            )}
          </ul>
        </section>
      )}
    </article>
  );
}
