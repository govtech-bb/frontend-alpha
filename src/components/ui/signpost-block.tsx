import { Link, Text } from "@govtech-bb/react";
import NextLink from "next/link";

type SignpostBlockProps = {
  href: string;
  title: string;
  description?: string;
};

export const SignpostBlock = ({
  href,
  title,
  description,
}: SignpostBlockProps) => (
  <div className="flex flex-col items-start gap-xs border-neutral-grey border-b-2 py-s last:border-0">
    <Text as="p">
      <Link as={NextLink} href={href}>
        {title}
      </Link>
    </Text>
    {description && <Text as="p">{description}</Text>}
  </div>
);
