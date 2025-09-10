import fs from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import { Typography } from "@/components/ui/typography";
import type { Service } from "@/types/service";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

async function getServiceData(slug: string): Promise<Service | null> {
  try {
    const filePath = path.join(
      process.cwd(),
      "src",
      "content",
      "services",
      `${slug}.json`
    );
    const fileContents = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileContents) as Service;
  } catch (_error) {
    return null;
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceData(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-white px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-4">
          <Typography variant="h1">{service.title}</Typography>
          <Typography className="text-gray-600 text-lg" variant="paragraph">
            {service.description}
          </Typography>
          <div className="inline-block rounded-md bg-[#FFDD7D] px-3 py-1 font-medium text-[#00267F] text-sm">
            {service.category}
          </div>
        </div>

        <div className="space-y-4">
          <Typography variant="h2">Overview</Typography>
          <Typography variant="paragraph">{service.overview}</Typography>
        </div>

        <div className="space-y-6">
          <Typography variant="h2">What you need to do</Typography>
          <div className="space-y-6">
            {service.steps.map((step, index) => (
              <div
                className="border-[#00267F] border-l-4 bg-gray-50 p-6"
                key={step.title}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00267F] font-bold text-sm text-white">
                        {index + 1}
                      </span>
                      <Typography className="m-0" variant="h3">
                        {step.title}
                      </Typography>
                      {step.required && (
                        <span className="rounded-md bg-red-100 px-2 py-1 font-medium text-red-800 text-xs">
                          Required
                        </span>
                      )}
                    </div>
                    <Typography className="ml-11" variant="paragraph">
                      {step.description}
                    </Typography>
                    <Typography
                      className="ml-11 text-gray-600 text-sm"
                      variant="paragraph"
                    >
                      <strong>Duration:</strong> {step.duration}
                    </Typography>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {service.requirements && service.requirements.length > 0 && (
          <div className="space-y-4">
            <Typography variant="h2">What you'll need</Typography>
            <ul className="space-y-2">
              {service.requirements.map((requirement) => (
                <li className="flex items-start gap-3" key={requirement}>
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#00267F]" />
                  <Typography variant="paragraph">{requirement}</Typography>
                </li>
              ))}
            </ul>
          </div>
        )}

        {service.timeline && (
          <div className="space-y-4">
            <Typography variant="h2">Timeline</Typography>
            <div className="space-y-3 rounded-lg border bg-gray-50 p-4">
              {service.timeline.deadline && (
                <div>
                  <strong className="text-red-600">Deadline:</strong>{" "}
                  {service.timeline.deadline}
                </div>
              )}
              <div>
                <strong>Processing time:</strong> {service.timeline.processing}
              </div>
              {service.timeline.urgentProcessing && (
                <div>
                  <strong>Urgent processing:</strong>{" "}
                  {service.timeline.urgentProcessing}
                </div>
              )}
            </div>
          </div>
        )}

        {service.costs && service.costs.length > 0 && (
          <div className="space-y-4">
            <Typography variant="h2">Costs</Typography>
            <div className="rounded-lg border bg-gray-50 p-4">
              <div className="space-y-3">
                {service.costs.map((cost) => (
                  <div
                    className="flex items-center justify-between"
                    key={cost.item}
                  >
                    <span>{cost.item}</span>
                    <span className="font-semibold">{cost.fee}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {service.contacts.length > 0 && (
          <div className="space-y-4">
            <Typography variant="h2">Contact information</Typography>
            <div className="space-y-4">
              {service.contacts.map((contact) => (
                <div
                  className="rounded-lg border bg-gray-50 p-4"
                  key={contact.name}
                >
                  <Typography className="mb-2" variant="h3">
                    {contact.name}
                  </Typography>
                  <div className="space-y-1 text-sm">
                    <div>
                      <strong>Phone:</strong>{" "}
                      <a
                        className="text-[#00267F] underline"
                        href={`tel:${contact.phone}`}
                      >
                        {contact.phone}
                      </a>
                    </div>
                    {contact.email && (
                      <div>
                        <strong>Email:</strong>{" "}
                        <a
                          className="text-[#00267F] underline"
                          href={`mailto:${contact.email}`}
                        >
                          {contact.email}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {service.importantNotes && service.importantNotes.length > 0 && (
          <div className="space-y-4">
            <Typography variant="h2">Important information</Typography>
            <div className="rounded-lg border-yellow-400 border-l-4 bg-yellow-50 p-4">
              <ul className="space-y-2">
                {service.importantNotes.map((note) => (
                  <li className="flex items-start gap-3" key={note}>
                    <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-yellow-600" />
                    <Typography className="text-yellow-900" variant="paragraph">
                      {note}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="border-t pt-4 text-gray-500 text-sm">
          Last updated:{" "}
          {new Date(service.lastUpdated).toLocaleDateString("en-GB")}
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceData(slug);

  if (!service) {
    return {
      title: "Service not found",
    };
  }

  return {
    title: `${service.title} - GovTech Barbados`,
    description: service.description,
  };
}
