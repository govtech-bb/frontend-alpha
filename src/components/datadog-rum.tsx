"use client";

import { useEffect } from "react";
import { initDatadog } from "@/lib/datadog";

export const DatadogRUM = () => {
  useEffect(() => {
    initDatadog();
  }, []);

  return null;
};
