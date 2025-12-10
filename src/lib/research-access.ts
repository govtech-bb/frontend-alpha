import { cookies } from "next/headers";
import type { PageType } from "@/types/content";

export const COOKIE_NAME = "research-access";

export async function hasResearchAccess() {
  const secret = process.env.RESEARCH_ACCESS_TOKEN;

  if (!secret) {
    return true;
  }

  const cookieStore = await cookies();
  const accessCookie = cookieStore.get(COOKIE_NAME);

  return accessCookie?.value === secret;
}

export function isValidToken(token: string): boolean {
  const secretToken = process.env.RESEARCH_ACCESS_TOKEN;
  return !!secretToken && token === secretToken;
}

/**
 * Check if a sub-page is protected based on its configuration in the content directory
 */
export function isProtectedSubpage(
  page: PageType,
  subPageSlug: string
): boolean {
  const subPage = page.subPages?.find((sp) => sp.slug === subPageSlug);
  return subPage?.protected === true;
}
