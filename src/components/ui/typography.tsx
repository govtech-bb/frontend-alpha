import { cva, type VariantProps } from "class-variance-authority";
import React, { type JSX } from "react";
import { cn } from "@/lib/utils";

const typographyVariants = cva(
  "text-foreground", // Base class for consistent theming
  {
    variants: {
      variant: {
        display: "font-bold text-[48px] leading-[115%] tracking-tight",
        h1: "font-bold text-[40px] leading-[115%] tracking-tight",
        h2: "font-semibold text-[32px] leading-[115%] tracking-tight",
        h3: "font-bold text-[28px] leading-[115%] tracking-tight",
        h4: "font-semibold text-2xl leading-[115%] tracking-tight", //24px
        h5: "font-medium text-xl leading-[115%] tracking-tight", //20px
        h6: "font-medium text-base leading-[115%] tracking-tight", //16px
        subheading: "font-medium text-[24px] leading-[130%]",
        paragraph: "font-normal text-xl leading-[150%]",
        body: "font-normal text-base leading-[150%]",
        small: "font-normal text-xs leading-[125%]",
        muted: "text-muted-foreground text-sm leading-[150%]",
        link: "cursor-pointer font-normal text-[20px] text-primary leading-[150%] underline-offset-4 transition-colors hover:underline",
        code: "rounded-md bg-muted px-2 py-1 font-mono text-sm",
      },
    },
    defaultVariants: {
      variant: "paragraph",
    },
  }
);

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
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

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, as, children, ...props }, ref) => {
    // Determine the appropriate HTML element based on variant or explicit 'as' prop
    const getElement = () => {
      if (as) return as;

      switch (variant) {
        case "h1":
          return "h1";
        case "h2":
          return "h2";
        case "h3":
          return "h3";
        case "h4":
          return "h4";
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

    const Element = getElement() as keyof JSX.IntrinsicElements;

    return React.createElement(
      Element,
      {
        className: cn(typographyVariants({ variant }), className),
        ref,
        ...props,
      },
      children
    );
  }
);

Typography.displayName = "Typography";

export { Typography, typographyVariants };
