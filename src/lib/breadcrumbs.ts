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

// Generate breadcrumb items
export const generateBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
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
