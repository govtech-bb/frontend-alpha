import { Heading, Link, Text } from "@govtech-bb/react";
import NextLink from "next/link";
import { getDirectoryEntries } from "@/lib/directory";

export default async function DirectoryPage() {
  const directory = await getDirectoryEntries();

  return (
    <>
      <Heading as="h1">Government Directory</Heading>
      <Text as="p">
        Find contact details and information about government ministries,
        departments and state bodies.
      </Text>

      <div className="mt-8 space-y-8">
        <section>
          <Heading as="h2">Ministries ({directory.ministries.length})</Heading>
          <div className="flex flex-col">
            {directory.ministries.map((entry) => (
              <div
                className="border-grey-00 border-t-2 py-4 first:border-0 lg:py-6"
                key={entry.slug}
              >
                <Link
                  as={NextLink}
                  className="text-[20px] leading-normal lg:text-[1.5rem] lg:leading-[2rem]"
                  href={`/government/directory/profile/${entry.slug}`}
                >
                  {entry.title}
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section>
          <Heading as="h2">
            Departments ({directory.departments.length})
          </Heading>
          <div className="flex flex-col">
            {directory.departments.map((entry) => (
              <div
                className="border-grey-00 border-t-2 py-4 first:border-0 lg:py-6"
                key={entry.slug}
              >
                <Link
                  as={NextLink}
                  className="text-[20px] leading-normal lg:text-[1.5rem] lg:leading-[2rem]"
                  href={`/government/directory/profile/${entry.slug}`}
                >
                  {entry.title}
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section>
          <Heading as="h2">
            State Bodies ({directory.stateBodies.length})
          </Heading>
          <div className="flex flex-col">
            {directory.stateBodies.map((entry) => (
              <div
                className="border-grey-00 border-t-2 py-4 first:border-0 lg:py-6"
                key={entry.slug}
              >
                <Link
                  as={NextLink}
                  className="text-[20px] leading-normal lg:text-[1.5rem] lg:leading-[2rem]"
                  href={`/government/directory/profile/${entry.slug}`}
                >
                  {entry.title}
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export function generateMetadata() {
  return {
    title: "Government Directory",
    description:
      "Find contact details and information about government ministries, departments and state bodies in Barbados.",
  };
}
