import { Heading, Link, Text } from "@govtech-bb/react";
import NextLink from "next/link";
import type { ReactNode } from "react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import type { ContactItem } from "@/components/ministry/ministry-page";
import { StageBanner } from "@/components/stage-banner";

export type RelatedMinistry = { slug: string; name: string };

export type PersonPageProps = {
  name: string;
  role?: string;
  photo?: string;
  photoAlt?: string;
  bio?: ReactNode;
  body?: ReactNode;
  contact?: ContactItem[];
  relatedMinistries?: RelatedMinistry[];
};

function renderContactValue(item: ContactItem): ReactNode {
  if (item.type === "phone") {
    const tel = item.value.replace(/[^\d+]/g, "");
    return <Link href={`tel:${tel}`}>{item.value}</Link>;
  }
  if (item.type === "email") {
    return <Link href={`mailto:${item.value}`}>{item.value}</Link>;
  }
  if (item.type === "website") {
    const href = item.value.startsWith("http")
      ? item.value
      : `https://${item.value}`;
    return (
      <Link href={href} rel="noopener noreferrer" target="_blank">
        {item.display ?? item.value}
      </Link>
    );
  }
  return item.value;
}

export function PersonPage({
  name,
  role,
  photo,
  photoAlt,
  bio,
  body,
  contact,
  relatedMinistries,
}: PersonPageProps) {
  return (
    <>
      <div className="bg-blue-10">
        <div className="container">
          <StageBanner stage="alpha" />
        </div>
      </div>

      <div className="container py-s">
        <Breadcrumbs />
      </div>

      <div className="container py-m">
        <div className="grid grid-cols-1 gap-l lg:grid-cols-[minmax(0,2fr)_360px] lg:gap-xl">
          <div className="flex flex-col gap-m">
            <header className="flex flex-col gap-xs">
              <Heading as="h1">{name}</Heading>
              {role && (
                <Text as="p" className="text-mid-grey-00">
                  {role}
                </Text>
              )}
            </header>

            {bio && (
              <section className="flex flex-col gap-s">
                <Heading as="h2">Biography</Heading>
                {typeof bio === "string" ? <Text as="p">{bio}</Text> : bio}
              </section>
            )}

            {body && <div className="prose-content">{body}</div>}
          </div>

          <aside
            aria-label="Member information"
            className="flex flex-col gap-m"
          >
            {photo && (
              // biome-ignore lint/performance/noImgElement: external/placeholder image
              <img
                alt={photoAlt ?? `Portrait of ${name}`}
                className="block aspect-[9/10] w-full rounded-sm object-cover"
                height={400}
                src={photo}
                width={360}
              />
            )}

            {contact && contact.length > 0 && (
              <div className="flex flex-col gap-s rounded-md bg-blue-10 p-m">
                <Heading as="h2" className="text-h3">
                  Contact
                </Heading>
                <dl className="flex flex-col gap-s">
                  {contact.map((item) => (
                    <div key={item.label}>
                      <dt className="text-mid-grey-00 text-sm">{item.label}</dt>
                      <dd className="m-0">{renderContactValue(item)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {relatedMinistries && relatedMinistries.length > 0 && (
              <div className="flex flex-col gap-s rounded-md bg-blue-10 p-m">
                <Heading as="h2" className="text-h3">
                  Related Ministries
                </Heading>
                <ul className="flex flex-col gap-xs">
                  {relatedMinistries.map((m) => (
                    <li key={m.slug}>
                      <Link as={NextLink} href={`/ministries/${m.slug}`}>
                        {m.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}
