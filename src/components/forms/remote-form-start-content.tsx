import { Heading, LinkButton, Text } from "@govtech-bb/react";
import type { ParsedRemoteFormDefinition } from "@/lib/forms/remote-form-schema";

type RemoteFormStartContentProps = {
  def: ParsedRemoteFormDefinition;
  formSlug: string;
};

/**
 * Server-rendered “start” page for S3-backed forms: copy is derived from the
 * same JSON as the wizard (no markdown file per form).
 */
export function RemoteFormStartContent({
  def,
  formSlug,
}: RemoteFormStartContentProps) {
  const ministryParts = [def.ministryName, def.ministryDepartment].filter(
    Boolean
  ) as string[];
  const ministryLine =
    ministryParts.length > 0 ? ministryParts.join(" — ") : null;

  return (
    <div className="container py-8 lg:py-16">
      <Heading as="h1" className="mb-6">
        {def.formName}
      </Heading>

      {def.program ? (
        <Text as="p" className="mb-4" size="body">
          {def.program}
        </Text>
      ) : null}

      {ministryLine ? (
        <Text as="p" className="mb-6 text-mid-grey-00" size="body">
          {ministryLine}
        </Text>
      ) : null}

      <Text as="p" className="mb-6" size="body">
        You should complete your application in one go. At the moment, it is not
        possible to save your answers and come back to them later.
      </Text>

      {def.preRequisites && def.preRequisites.length > 0 ? (
        <div className="mb-8">
          <Heading as="h2" className="mb-4">
            What you will need
          </Heading>
          <ul className="list-disc space-y-2 pl-7">
            {def.preRequisites.map((item) => (
              <li key={item}>
                <Text as="span" size="body">
                  {item}
                </Text>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {def.contact?.email ? (
        <Text as="p" className="mb-8" size="body">
          If you have questions, contact{" "}
          <a className="underline" href={`mailto:${def.contact.email}`}>
            {def.contact.email}
          </a>
          .
        </Text>
      ) : null}

      <LinkButton href={`/forms/${formSlug}/form`}>Start</LinkButton>
    </div>
  );
}
