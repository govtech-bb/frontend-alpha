import { Heading, Text } from "@govtech-bb/react";
import { cn } from "@/lib/utils";

type SignpostSectionProps = {
  heading: string;
  level?: "h1" | "h2" | "h3";
  description?: string;
  children: React.ReactNode;
  border?: boolean;
  className?: string;
};

export const SignpostSection = ({
  heading,
  level = "h2",
  description,
  children,
  border = false,
  className,
}: SignpostSectionProps) => (
  <div
    className={cn(
      "flex flex-col gap-s",
      border && "border-grey-00 border-b-2 pb-m",
      className
    )}
  >
    <Heading as={level}>{heading}</Heading>

    {description && <Text as="p">{description}</Text>}

    <div className="flex flex-col">{children}</div>
  </div>
);
