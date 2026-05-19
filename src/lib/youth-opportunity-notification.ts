import type { Opportunity } from "@/types/opportunity";

export const DEFAULT_YOUTH_OPPORTUNITY_NOTIFICATION_EMAIL =
  "shannon.clarke@govtech.bb";

export function getYouthOpportunityNotificationEmail(
  opportunity: Pick<Opportunity, "notificationEmail">
): string {
  return (
    opportunity.notificationEmail ??
    DEFAULT_YOUTH_OPPORTUNITY_NOTIFICATION_EMAIL
  );
}

export function getYouthOpportunityNotificationCc(
  opportunity: Pick<Opportunity, "notificationCc">
): string | null {
  return opportunity.notificationCc ?? null;
}
