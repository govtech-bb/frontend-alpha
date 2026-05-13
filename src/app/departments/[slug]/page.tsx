import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactTable } from "@/components/department/contact-table";
import { MinistryPage } from "@/components/ministry/ministry-page";
import { DEPARTMENTS, getDepartmentBySlug } from "@/data/departments";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return DEPARTMENTS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const department = getDepartmentBySlug(slug);
  if (!department) return {};
  return { title: department.name };
}

export default async function DepartmentDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const department = getDepartmentBySlug(slug);
  if (!department) notFound();

  const body = department.contactTable ? (
    <ContactTable
      address={department.contactTable.address}
      rows={department.contactTable.rows}
      title={department.name}
    />
  ) : undefined;

  return (
    <MinistryPage
      body={body}
      contact={department.contact}
      intro={department.intro}
      title={department.name}
    />
  );
}
