"use client";

import { Link } from "@govtech-bb/react";
import NextLink from "next/link";
import { ChevronLeftSVG } from "@/components/icons/chevron-left";
import { useStepFocus } from "../hooks/use-step-focus";

export type ConfirmationSection = {
  /** Section title (h2 or h3 depending on level) */
  title: string;
  /** Section content (plain text or JSX) */
  content: React.ReactNode;
  /** Optional heading level (2 or 3, default: 2) */
  level?: 2 | 3;
};

export type ConfirmationTemplateProps = {
  /** Main page title */
  title: string;
  /** Form title for accessibility announcement */
  formTitle: string;
  /** Subtitle text shown below the title */
  subtitle: string;
  /** Breadcrumb category link text */
  breadcrumbText: string;
  /** Breadcrumb category link href */
  breadcrumbHref: string;
  /** Array of content sections to display */
  sections: ConfirmationSection[];
};

/**
 * Standard confirmation page template based on Birth Registration confirmation
 * Provides consistent layout with green header, breadcrumb, and content sections
 *
 * @example
 * ```typescript
 * export function Confirmation({ numberOfCertificates }: ConfirmationProps) {
 *   return (
 *     <ConfirmationTemplate
 *       title="Pre-registration complete"
 *       formTitle="Death Certificate Application"
 *       subtitle="Your information has been sent to the Registration Department."
 *       breadcrumbText="Births, deaths, marriages and care"
 *       breadcrumbHref="#"
 *       sections={[
 *         {
 *           title: "What you must do next",
 *           content: (
 *             <>
 *               <p className="mb-4">You must now visit...</p>
 *               <p>You do not need an appointment.</p>
 *             </>
 *           ),
 *         },
 *         {
 *           title: "Location",
 *           level: 3,
 *           content: (
 *             <address className="not-italic">
 *               Registration Department<br />
 *               Supreme Court Complex<br />
 *               Whitepark Road<br />
 *               St. Michael
 *             </address>
 *           ),
 *         },
 *       ]}
 *     />
 *   );
 * }
 * ```
 */
export function ConfirmationTemplate({
  title,
  formTitle,
  subtitle,
  breadcrumbText,
  breadcrumbHref,
  sections,
}: ConfirmationTemplateProps) {
  const titleRef = useStepFocus(title, formTitle);

  return (
    <>
      {/* Header section with breadcrumb and title */}
      <div className="bg-green-40">
        <div className="container pt-4 pb-8">
          {/* Breadcrumb */}
          <div className="flex items-center">
            <div className="flex items-center gap-x-2">
              <ChevronLeftSVG className="shrink-0" />

              <Link
                as={NextLink}
                className="text-[20px] leading-normal lg:gap-3 lg:text-[1.5rem] lg:leading-[2rem]"
                href={breadcrumbHref}
                variant={"secondary"}
              >
                {breadcrumbText}
              </Link>
            </div>
          </div>

          {/* Title section */}
          <div className="flex flex-col gap-4 pt-6 lg:pt-16">
            <h1
              className="pt-2 font-bold text-[56px] text-black leading-[1.15] focus:outline-none"
              ref={titleRef}
              tabIndex={-1}
            >
              {title}
            </h1>

            <p className="font-normal text-[20px] text-black leading-[1.7] lg:text-[32px] lg:leading-[1.5]">
              {subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container space-y-6 py-4 lg:grid lg:grid-cols-3 lg:space-y-8 lg:pt-8 lg:pb-16">
        <div className="col-span-2 space-y-6 lg:space-y-8">
          {sections.map((section, index) => {
            const HeadingTag = section.level === 3 ? "h3" : "h2";
            const headingClass =
              section.level === 3
                ? "mb-4 font-bold text-[24px] text-black leading-[1.25]"
                : "mb-4 font-bold text-[40px] text-black leading-[1.25]";

            return (
              <div className="pt-2" key={index}>
                <HeadingTag className={headingClass}>
                  {section.title}
                </HeadingTag>
                <div className="font-normal text-[20px] text-black leading-[1.7]">
                  {section.content}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
