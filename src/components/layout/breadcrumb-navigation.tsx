"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type BreadcrumbItem = {
  label: string;
  href: string;
};

// You can extend this mapping or load it from a config file
const DEFAULT_LABEL_MAP: Record<string, string> = {
  "improving-digital-services": "Improving Digital Services",
  "how-we-build": "How We Build",
  "digital-roadmap": "Digital Roadmap",
  "user-research": "User Research",
  accessibility: "Accessibility",
  "privacy-policy": "Privacy Policy",
  "terms-of-service": "Terms of Service",
};

// Function to create human-readable labels from slugs
function createLabel(slug: string): string {
  // First check our mapping
  if (DEFAULT_LABEL_MAP[slug]) {
    return DEFAULT_LABEL_MAP[slug];
  }

  // Otherwise, convert kebab-case to Title Case
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const Breadcrumb = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render on server to avoid hydration mismatch
  if (!isClient) {
    return <div className="h-6" />; // Placeholder to prevent layout shift
  }

  // Don't show breadcrumbs on home page
  if (pathname === "/") {
    return null;
  }

  // Generate breadcrumb items
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

    let currentPath = "";

    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;

      // Don't add the current page as a link (last segment)
      if (index < pathSegments.length - 1) {
        breadcrumbs.push({
          label: createLabel(segment),
          href: currentPath,
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center space-x-2 px-4 pt-4 text-sm"
    >
      {breadcrumbs.length > 1 ? (
        breadcrumbs.map((crumb, index) => (
          <div className="flex items-center" key={crumb.href}>
            {index > 0 && (
              <Image
                alt="arrow"
                height="8"
                src="/images/chevron-left.svg"
                width="11"
              />
            )}
            <Link
              className="text-[#00654A] text-[20px] underline"
              href={crumb.href}
            >
              {crumb.label}
            </Link>
          </div>
        ))
      ) : (
        <>
          <Image
            alt="arrow"
            height="8"
            src="/images/chevron-left.svg"
            width="11"
          />
          <button
            className="text-[#00654A] text-[20px] underline"
            onClick={() => router.back()}
            type="button"
          >
            Back
          </button>
        </>
      )}
    </nav>
  );
};

export default Breadcrumb;
