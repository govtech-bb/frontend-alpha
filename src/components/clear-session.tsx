"use client";

import { useEffect } from "react";

export function ClearSession() {
  useEffect(() => {
    // Clear session storage when component mounts
    sessionStorage.removeItem("register-birth-form");
  }, []);

  return null;
}
