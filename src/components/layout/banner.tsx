"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { Typography } from "@/components/ui/typography";
import { StageBanner } from "../stage-banner";

export const Banner = () => {
  const pathname = usePathname();
  const isOnHomePage = pathname === "/";
  return (
    <div
      className={`bg-blue-100 ${isOnHomePage ? "pb-2" : ""} text-neutral-white`}
    >
      <div className="container">
        <div className="flex items-center justify-between py-2">
          <span className="flex items-center gap-2">
            <Image
              alt="flag"
              className="block"
              height="16"
              src="/images/coat-of-arms.png"
              width="17"
            />
            <Typography className="text-neutral-white" variant="small">
              Official government website
            </Typography>
          </span>
        </div>
        {isOnHomePage ? <StageBanner className="py-2" stage="alpha" /> : null}
      </div>
    </div>
  );
};
