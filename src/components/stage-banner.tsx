import { Link, StatusBanner, Text } from "@govtech-bb/react";
import NextLink from "next/link";

type Stage = "alpha" | "beta" | "migrated";

type StageBannerProps = { className?: string } & (
  | { stage: "alpha" | "beta"; url?: string; originalSource?: never }
  | { stage: "migrated"; originalSource?: string; url?: never }
);

const COPY: Record<Stage, { prefix: string; linkText: string }> = {
  alpha: { prefix: "This page is in ", linkText: "alpha" },
  beta: { prefix: "This page is in ", linkText: "beta" },
  migrated: {
    prefix: "This content has been migrated from ",
    linkText: "gov.bb",
  },
};

const DEFAULT_URL: Record<Stage, string | undefined> = {
  alpha: "/what-we-mean-by-alpha",
  beta: "/what-we-mean-by-alpha",
  migrated: undefined,
};

export const StageBanner = ({
  stage,
  url,
  originalSource,
  className,
}: StageBannerProps) => {
  const { prefix, linkText } = COPY[stage];
  const isMigrated = stage === "migrated";
  const href = isMigrated ? originalSource : (url ?? DEFAULT_URL[stage]);
  const isExternal = isMigrated;
  return (
    <StatusBanner className={className} variant={stage}>
      <Text as="p">
        {prefix}
        {href ? (
          <Link
            as={NextLink}
            href={href}
            rel={isExternal ? "noopener noreferrer" : undefined}
            target={isExternal ? "_blank" : undefined}
            variant="secondary"
          >
            {linkText}
          </Link>
        ) : (
          linkText
        )}
        .
      </Text>
    </StatusBanner>
  );
};
