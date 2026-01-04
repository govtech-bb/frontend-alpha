"use client";

import { Text } from "@govtech-bb/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { StageBanner } from "../stage-banner";

export const Banner = () => {
  const pathname = usePathname();
  const isOnHomePage = pathname === "/";
  return (
    <div className={`bg-blue-100 ${isOnHomePage ? "pb-xs" : ""} text-white-00`}>
      <div className="container">
        <div className="flex items-center justify-between py-xs">
          <span className="flex items-center gap-xs">
            <Image
              alt="flag"
              className="block"
              height="16"
              src="/images/coat-of-arms.png"
              width="17"
            />
            <Text as="span" className="text-white-00" size={"caption"}>
              Official government website
            </Text>
          </span>
        </div>
        {isOnHomePage ? <StageBanner className="py-xs" stage="alpha" /> : null}
      </div>
    </div>
  );
};
