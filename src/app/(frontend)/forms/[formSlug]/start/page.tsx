import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClearFormStorage } from "@/components/clear-form-storage";
import { RemoteFormStartContent } from "@/components/forms/remote-form-start-content";
import { PageViewTracker } from "@/components/page-view-tracker";
import { getCachedRemoteFormDefinition } from "@/lib/forms/get-cached-remote-form-definition";
import { isValidRemoteFormSlug } from "@/lib/forms/remote-form-slug";

interface PageProps {
  params: Promise<{ formSlug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { formSlug } = await params;
  if (!isValidRemoteFormSlug(formSlug)) {
    return { title: "Before you start" };
  }
  const def = await getCachedRemoteFormDefinition(formSlug);
  const title = def?.formName
    ? `${def.formName} — Before you start`
    : "Before you start";
  return { title };
}

export default async function RemoteFormStartPage({ params }: PageProps) {
  const { formSlug } = await params;
  if (!isValidRemoteFormSlug(formSlug)) {
    notFound();
  }

  const def = await getCachedRemoteFormDefinition(formSlug);
  if (!def) {
    notFound();
  }

  return (
    <>
      <ClearFormStorage storageKey={def.formSlug} />
      <PageViewTracker
        category="remote-forms"
        event="page-start-view"
        form={def.formSlug}
      />
      <RemoteFormStartContent def={def} formSlug={formSlug} />
    </>
  );
}

export const revalidate = 60;
