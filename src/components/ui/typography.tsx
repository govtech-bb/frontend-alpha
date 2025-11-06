import { cva } from "class-variance-authority";
import React, { type JSX } from "react";
import {
  Typography as DSTypography,
  type TypographyProps as DSTypographyProps,
} from "@/components/ds";
import { cn } from "@/lib/utils";

// Extended variant types for custom variants not in DS
const customTypographyVariants = cva("text-foreground", {
  variants: {
    variant: {
      // Custom variants not in design system
      h5: "font-medium text-xl leading-[115%] tracking-tight", //20px
      h6: "font-medium text-base leading-[115%] tracking-tight", //16px
      small: "font-normal text-xs leading-[125%] lg:text-base",
      muted: "text-muted-foreground text-sm leading-[150%]",
      link: "cursor-pointer font-normal text-[20px] text-primary leading-[150%] underline-offset-4 transition-colors hover:underline",
      code: "rounded-md bg-muted px-2 py-1 font-mono text-sm",
      // Map our old variants to DS variants for backward compatibility
      subheading: "", // Will map to body-lg
      paragraph: "", // Will map to body
    },
  },
  defaultVariants: {
    variant: "paragraph",
  },
});

// All supported variants (DS + custom)
type DSVariant = "display" | "h1" | "h2" | "h3" | "h4" | "body-lg" | "body";
type CustomVariant = "h5" | "h6" | "small" | "muted" | "link" | "code";
type LegacyVariant = "subheading" | "paragraph";
type TypographyVariant = DSVariant | CustomVariant | LegacyVariant;

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  as?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "span"
    | "div"
    | "a"
    | "code";
  children: React.ReactNode;
}

const Typography = ({
  className,
  variant = "paragraph",
  as,
  children,
  ...props
}: TypographyProps) => {
  // Map legacy variants to DS variants
  const mapVariantToDS = (v: TypographyVariant): DSVariant | null => {
    switch (v) {
      case "subheading":
        return "body-lg";
      case "paragraph":
        return "body";
      // DS variants pass through
      case "display":
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "body-lg":
      case "body":
        return v;
      // Custom variants don't map to DS
      default:
        return null;
    }
  };

  const dsVariant = mapVariantToDS(variant);

  // If variant maps to DS, use DS Typography
  if (dsVariant) {
    return (
      <DSTypography
        className={className}
        variant={dsVariant}
        {...(props as Omit<DSTypographyProps, "variant">)}
      >
        {children}
      </DSTypography>
    );
  }

  // Custom variants: render manually
  const getElement = (): keyof JSX.IntrinsicElements => {
    if (as) return as;

    switch (variant) {
      case "h5":
        return "h5";
      case "h6":
        return "h6";
      case "link":
        return "a";
      case "code":
        return "code";
      case "small":
      case "muted":
        return "span";
      default:
        return "p";
    }
  };

  const Element = getElement();

  return React.createElement(
    Element,
    {
      className: cn(
        customTypographyVariants({ variant: variant as CustomVariant }),
        className
      ),
      ...props,
    },
    children
  );
};

Typography.displayName = "Typography";

export { Typography, customTypographyVariants as typographyVariants };
