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
    return (
      <Link className="text-teal-00" href={`tel:${tel}`}>
        {item.value}
      </Link>
    );
  }
  if (item.type === "email") {
    return (
      <Link className="break-all text-teal-00" href={`mailto:${item.value}`}>
        {item.value}
      </Link>
    );
  }
  if (item.type === "website") {
    const href = item.value.startsWith("http")
      ? item.value
      : `https://${item.value}`;
    return (
      <Link
        className="break-all text-teal-00"
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {item.display ?? item.value}
      </Link>
    );
  }
  if (Array.isArray(item.value)) {
    return (
      <span className="text-black-00">
        {item.value.map((line, i) => (
          <span key={i}>
            {line}
            {i < (item.value as ReactNode[]).length - 1 && <br />}
          </span>
        ))}
      </span>
    );
  }
  return <span className="text-black-00">{item.value}</span>;
}

export interface Minister {
  name: string;
  role: string;
  photo?: string;
}

export interface MinistryPageProps {
  title: string;
  intro: ReactNode;
  body?: ReactNode;
  featured?: FeaturedItem[];
  services?: MinistryService[];
  onlineServices?: MinistryService[];
  minister?: Minister;
  leadershipLabel?: string;
  contact?: ContactItem[];
  associatedDepartments?: AssociatedDepartmentGroup[];
  originalSource?: string;
}

export interface AssociatedDepartmentGroup {
  category?: string;
  items: string[];
}

export function MinistryPage({
  title,
  intro,
  body,
  featured,
  services,
  onlineServices,
  minister,
  leadershipLabel = "Our Minister",
  contact,
  associatedDepartments,
  originalSource,
}: MinistryPageProps) {
  return (
    <>
      <div className="bg-pink-10">
        <div className="container">
          <StageBanner originalSource={originalSource} stage="migrated" />
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
                <p className="font-bold text-[20px] text-black-00 leading-normal">
                  {leadershipLabel}
                </p>
                <div className="flex w-full items-center gap-s">
                  <div className="flex min-w-0 flex-1 flex-col gap-xxs leading-normal">
                    <span className="font-bold text-[20px] text-teal-00">
                      {minister.name}
                    </span>
                    <span className="text-[16px] text-mid-grey-00">
                      {minister.role}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {contact && contact.length > 0 && (
              <div className="flex flex-col gap-s rounded-md bg-[#f5f7fa] p-xm">
                <p className="font-bold text-[20px] text-black-00 leading-normal">
                  Contact
                </p>
                <dl className="flex flex-col gap-s">
                  {contact.map((item, idx) => (
                    <div className="flex flex-col gap-xxs" key={idx}>
                      <dt className="text-[14px] text-mid-grey-00">
                        {item.label}
                      </dt>
                      <dd className="m-0 text-[16px]">
                        {renderContactValue(item)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {associatedDepartments && associatedDepartments.length > 0 && (
              <div className="flex flex-col gap-s rounded-md bg-[#f5f7fa] p-xm">
                <p className="font-bold text-[20px] text-black-00 leading-normal">
                  Associated Departments
                </p>
                <div className="flex flex-col gap-s">
                  {associatedDepartments.map((group, idx) => (
                    <div
                      className="flex flex-col gap-xxs"
                      key={group.category ?? idx}
                    >
                      {group.category && (
                        <p className="font-bold text-[14px] text-mid-grey-00">
                          {group.category}
                        </p>
                      )}
                      <ul className="flex flex-col gap-xxs">
                        {group.items.map((dept) => (
                          <li className="text-[16px] text-black-00" key={dept}>
                            {dept}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}
