/**
 * Component-backed content pages.
 * --------------------------------------------------------------
 * Some IA pages (marked `type: "component"` in the content directory) render
 * a React component instead of markdown. This registry maps the full slug
 * path to its component and metadata so the catch-all route can dispatch with
 * a single lookup instead of a growing chain of hardcoded conditionals.
 *
 * To add a component page: register it here and mark the subpage (or page)
 * `type: "component"` in `content-directory.ts`. No route edits required.
 */

import type { Metadata } from "next";
import type { ComponentType } from "react";
import {
  FindJusticeOfThePeacePage,
  findJusticeOfThePeaceMetadata,
} from "@/components/justice-of-the-peace/find-page";
import {
  FindOpenPharmacyPage,
  findOpenPharmacyMetadata,
} from "@/components/open-pharmacy/find-page";
import { StormReadyChecklistPage } from "@/components/stormready/checklist-page";
import {
  StormReadyLandingPage,
  stormReadyChecklistMetadata,
  stormReadyLandingMetadata,
} from "@/components/stormready/landing-page";

interface ComponentPage {
  Component: ComponentType;
  metadata: Metadata;
}

export const COMPONENT_PAGES: Record<string, ComponentPage> = {
  "travel-id-citizenship/justice-of-the-peace/find": {
    Component: FindJusticeOfThePeacePage,
    metadata: findJusticeOfThePeaceMetadata,
  },
  "health-and-emergency-services/open-pharmacy/find": {
    Component: FindOpenPharmacyPage,
    metadata: findOpenPharmacyMetadata,
  },
  "health-and-emergency-services/stormready": {
    Component: StormReadyLandingPage,
    metadata: stormReadyLandingMetadata,
  },
  "health-and-emergency-services/stormready/checklist": {
    Component: StormReadyChecklistPage,
    metadata: stormReadyChecklistMetadata,
  },
};
