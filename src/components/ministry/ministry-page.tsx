import { Heading, Link, Text } from "@govtech-bb/react";
import NextLink from "next/link";
import type { ReactNode } from "react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { StageBanner } from "@/components/stage-banner";

export interface FeaturedItem {
  title: string;
  href: string;
  description: string;
  image: string;
  imageAlt?: string;
}

export interface MinistryService {
  title: string;
  href: string;
  description: ReactNode;
}

export type ContactItem =
  | { label: string; type: "phone"; value: string }
  | { label: string; type: "email"; value: string }
  | { label: string; type: "website"; value: string; display?: string }
  | { label: string; type?: "text"; value: ReactNode };

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

export type Minister = {
  name: string;
  role: string;
  photo?: string;
  slug?: string;
};

export type MinistryPageProps = {
  title: string;
  intro: ReactNode;
  heroImage: string;
  heroImageAlt?: string;
  body?: ReactNode;
  featured?: FeaturedItem[];
  services?: MinistryService[];
  onlineServices?: MinistryService[];
  minister?: Minister;
  contact?: ContactItem[];
};

export function MinistryPage({
  title,
  intro,
  heroImage,
  heroImageAlt = "",
  body,
  featured,
  services,
  onlineServices,
  minister,
  contact,
}: MinistryPageProps) {
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

      <section className="bg-teal-00 py-l text-white-00">
        <div className="container grid grid-cols-1 items-center gap-m lg:grid-cols-[2fr_1fr] lg:gap-xl">
          <div className="flex flex-col gap-s">
            <Heading as="h1" className="text-white-00">
              {title}
            </Heading>
            <Text as="p" className="text-white-00">
              {intro}
            </Text>
          </div>
          <div className="aspect-[4/3] w-full overflow-hidden lg:max-h-72">
            {/** biome-ignore lint/performance/noImgElement: external/placeholder image */}
            <img
              alt={heroImageAlt}
              className="h-full w-full object-cover"
              height={600}
              src={heroImage}
              width={800}
            />
          </div>
        </div>
      </section>

      <div className="container py-m">
        <div className="grid grid-cols-1 gap-l lg:grid-cols-[2fr_1fr] lg:gap-xl">
          <div className="flex flex-col gap-l">
            {body && <div className="prose-content">{body}</div>}

            {featured && featured.length > 0 && (
              <section>
                <Heading as="h2" className="mb-s">
                  Featured
                </Heading>
                <ul className="grid grid-cols-1 gap-m md:grid-cols-2">
                  {featured.map((item) => (
                    <li className="flex flex-col gap-xs" key={item.href}>
                      <div className="aspect-video w-full overflow-hidden">
                        {/** biome-ignore lint/performance/noImgElement: external/placeholder image */}
                        <img
                          alt={item.imageAlt ?? ""}
                          className="h-full w-full object-cover"
                          height={450}
                          src={item.image}
                          width={800}
                        />
                      </div>
                      <Heading as="h3">
                        <Link as={NextLink} href={item.href}>
                          {item.title}
                        </Link>
                      </Heading>
                      <Text as="p">{item.description}</Text>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {onlineServices && onlineServices.length > 0 && (
              <section>
                <Heading as="h2" className="mb-s">
                  Online services
                </Heading>
                <ul className="flex flex-col">
                  {onlineServices.map((service) => (
                    <li
                      className="flex flex-col gap-xxs border-blue-10 border-b py-s"
                      key={service.href}
                    >
                      <Heading as="h3">
                        <Link as={NextLink} href={service.href}>
                          {service.title}
                        </Link>
                      </Heading>
                      <Text as="p">{service.description}</Text>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {services && services.length > 0 && (
              <section>
                <Heading as="h2" className="mb-s">
                  Departments and agencies
                </Heading>
                <ul className="flex flex-col">
                  {services.map((service) => (
                    <li
                      className="flex flex-col gap-xxs border-blue-10 border-b py-s"
                      key={service.href}
                    >
                      <Heading as="h3">
                        <Link as={NextLink} href={service.href}>
                          {service.title}
                        </Link>
                      </Heading>
                      <Text as="p">{service.description}</Text>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside
            aria-label="Ministry information"
            className="flex flex-col gap-m"
          >
            {minister && (
              <div className="flex flex-col gap-s rounded-md bg-[#f5f7fa] p-xm">
                <p className="font-bold text-[20px] text-black-00 leading-[1.5]">
                  Our Minister
                </p>
                <div className="flex w-full items-center gap-s">
                  <div
                    aria-hidden="true"
                    className="h-20 w-20 shrink-0 overflow-hidden rounded-full bg-[#e6e5e5]"
                  >
                    {minister.photo && (
                      // biome-ignore lint/performance/noImgElement: external/placeholder image
                      <img
                        alt=""
                        className="h-full w-full object-cover"
                        height={80}
                        src={minister.photo}
                        width={80}
                      />
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-xxs leading-[1.5]">
                    {minister.slug ? (
                      <Link
                        as={NextLink}
                        className="font-bold text-[20px] text-teal-00"
                        href={`/people/${minister.slug}`}
                      >
                        {minister.name}
                      </Link>
                    ) : (
                      <span className="font-bold text-[20px] text-teal-00">
                        {minister.name}
                      </span>
                    )}
                    <span className="text-[16px] text-mid-grey-00">
                      {minister.role}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {contact && contact.length > 0 && (
              <div className="flex flex-col gap-s rounded-md bg-blue-10 p-m">
                <Heading as="h2" className="text-h3">
                  Contact
                </Heading>
                <dl className="flex flex-col gap-xs">
                  {contact.map((item) => (
                    <div key={item.label}>
                      <dt className="text-mid-grey-00 text-sm">{item.label}</dt>
                      <dd className="m-0">{renderContactValue(item)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}
