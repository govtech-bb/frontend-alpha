import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RemoteDynamicForm } from "@/components/forms/remote-dynamic-form";
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
    return { title: "Form" };
  }
  const def = await getCachedRemoteFormDefinition(formSlug);
  return { title: def?.formName ?? "Form" };
}

export default async function RemoteFormPage({ params }: PageProps) {
  const { formSlug } = await params;
  if (!isValidRemoteFormSlug(formSlug)) {
    notFound();
  }

  const def = await getCachedRemoteFormDefinition(formSlug);
  if (!def) {
    notFound();
  }

  return (
    <RemoteDynamicForm
      formName={def.formName}
      formSlug={def.formSlug}
      formSteps={def.formSteps}
      ministryName={def.ministryName ?? null}
      notificationEmail={def.contact?.email ?? null}
    />
  );
}

export const revalidate = 60;
