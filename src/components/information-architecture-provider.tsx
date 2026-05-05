"use client";

import { createContext, type ReactNode, useContext } from "react";
import type { InformationContent } from "@/types/content";

const InformationArchitectureContext = createContext<InformationContent[]>([]);

export function InformationArchitectureProvider({
  value,
  children,
}: {
  value: InformationContent[];
  children: ReactNode;
}) {
  return (
    <InformationArchitectureContext.Provider value={value}>
      {children}
    </InformationArchitectureContext.Provider>
  );
}

export function useInformationArchitecture(): InformationContent[] {
  return useContext(InformationArchitectureContext);
}
