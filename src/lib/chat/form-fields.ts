import { formSteps as applyForConductorLicence } from "@/schema/apply-for-conductor-licence";
import { formSteps as getBirthCertificate } from "@/schema/get-birth-certificate";
import { formSteps as getDeathCertificate } from "@/schema/get-death-certificate";
import { formSteps as getMarriageCertificate } from "@/schema/get-marriage-certificate";
import { formSteps as jobstartPlusProgramme } from "@/schema/jobstart-plus-programme";
import { formSteps as postOfficeRedirectionBusiness } from "@/schema/post-office-redirection-business";
import { formSteps as postOfficeRedirectionDeceased } from "@/schema/post-office-redirection-deceased";
import { formSteps as postOfficeRedirectionIndividual } from "@/schema/post-office-redirection-individual";
import { formSteps as primarySchoolTextbookGrant } from "@/schema/primary-school-textbook-grant";
import { formSteps as projectProtegeMentor } from "@/schema/project-protege-mentor";
import { formSteps as requestAFireServiceInspection } from "@/schema/request-a-fire-service-inspection";
import { formSteps as requestACentenarian } from "@/schema/request-a-presidential-visit-for-a-centenarian";
import { formSteps as reserveSocietyName } from "@/schema/reserve-society-name";
import { formSteps as sellGoodsServicesBeachPark } from "@/schema/sell-goods-services-beach-park";
import { formSteps as communitySportsProgramme } from "@/schema/sports-training-programme-form-schema";
import type { FormField, FormStep } from "@/types";

const SCHEMA_BY_SLUG: Record<string, FormStep[]> = {
  "apply-for-conductor-licence": applyForConductorLicence,
  "community-sports-programme": communitySportsProgramme,
  "get-birth-certificate": getBirthCertificate,
  "get-death-certificate": getDeathCertificate,
  "get-marriage-certificate": getMarriageCertificate,
  "jobstart-plus-programme": jobstartPlusProgramme,
  "post-office-redirection-business": postOfficeRedirectionBusiness,
  "post-office-redirection-deceased": postOfficeRedirectionDeceased,
  "post-office-redirection-individual": postOfficeRedirectionIndividual,
  "primary-school-textbook-grant": primarySchoolTextbookGrant,
  "project-protege-mentor": projectProtegeMentor,
  "request-a-fire-service-inspection": requestAFireServiceInspection,
  "request-a-presidential-visit-for-a-centenarian": requestACentenarian,
  "reserve-society-name": reserveSocietyName,
  "sell-goods-services-beach-park": sellGoodsServicesBeachPark,
};

function isRequired(field: FormField): boolean {
  const req = field.validation?.required;
  return typeof req === "string" && req.length > 0;
}

function describeField(field: FormField, indent = ""): string[] {
  const lines: string[] = [];

  if (field.type === "showHide") {
    for (const nested of field.showHide.fields) {
      lines.push(...describeField(nested, indent));
    }
    return lines;
  }

  if (field.type === "fieldArray") {
    lines.push(
      `${indent}- ${field.name}[] (${field.label}) — repeatable group:`
    );
    for (const nested of field.fieldArray.fields ?? []) {
      lines.push(...describeField(nested, `${indent}  `));
    }
    return lines;
  }

  if (!isRequired(field)) return lines;

  let suffix = "";
  if (
    (field.type === "select" ||
      field.type === "radio" ||
      field.type === "checkbox") &&
    field.options?.length
  ) {
    const values = field.options.map((o) => o.value).filter(Boolean);
    suffix = ` [one of: ${values.join(", ")}]`;
  } else {
    suffix = ` [${field.type}]`;
  }

  lines.push(`${indent}- ${field.name}${suffix} — ${field.label}`);
  return lines;
}

const SUMMARY_CACHE = new Map<string, string | null>();

export function summarizeFormFields(slug: string): string | null {
  const cached = SUMMARY_CACHE.get(slug);
  if (cached !== undefined) return cached;

  const steps = SCHEMA_BY_SLUG[slug];
  if (!steps) {
    SUMMARY_CACHE.set(slug, null);
    return null;
  }

  const sections: string[] = [];
  for (const step of steps) {
    if (!step.fields?.length) continue;
    if (step.id === "review" || step.id === "declaration") continue;
    const lines: string[] = [];
    for (const field of step.fields) {
      lines.push(...describeField(field));
    }
    if (lines.length) {
      sections.push(
        `### ${step.title} (step: ${step.id})\n${lines.join("\n")}`
      );
    }
  }
  const result = sections.join("\n\n");
  SUMMARY_CACHE.set(slug, result);
  return result;
}
