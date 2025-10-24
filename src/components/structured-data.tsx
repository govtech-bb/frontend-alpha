import type { GovernmentService, Organization, WithContext } from "schema-dts";

export function OrganizationSchema() {
  const schema: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    name: "Government of Barbados",
    url: "https://alpha.gov.bb",
    description:
      "Official website of the Government of Barbados providing public services and information to citizens, residents, businesses, and visitors.",
    areaServed: {
      "@type": "Country",
      name: "Barbados",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Government Services",
      areaServed: "BB",
    },
  };

  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      type="application/ld+json"
    />
  );
}

type ServiceSchemaProps = {
  name: string;
  description: string;
  url: string;
  category?: string;
};

export function GovernmentServiceSchema({
  name,
  description,
  url,
  category,
}: ServiceSchemaProps) {
  const schema: WithContext<GovernmentService> = {
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    name,
    description,
    url,
    provider: {
      "@type": "GovernmentOrganization",
      name: "Government of Barbados",
      url: "https://alpha.gov.bb",
    },
    areaServed: {
      "@type": "Country",
      name: "Barbados",
    },
    ...(category && { serviceType: category }),
  };

  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      type="application/ld+json"
    />
  );
}

type BreadcrumbItem = {
  name: string;
  url: string;
};

type BreadcrumbSchemaProps = {
  items: BreadcrumbItem[];
};

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      type="application/ld+json"
    />
  );
}
