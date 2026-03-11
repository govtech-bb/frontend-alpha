import type { RumGlobal } from "@datadog/browser-rum";

declare global {
  type Window = {
    DD_RUM?: RumGlobal;
  };
}
