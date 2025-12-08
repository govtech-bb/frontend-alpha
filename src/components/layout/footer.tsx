import { Link } from "@govtech-bb/react";
import Image from "next/image";
import NextLink from "next/link";
import { Typography } from "../ui/typography";

export const Footer = () => (
  <footer className="bg-blue-100">
    <div className="container">
      <div className="grid lg:grid-cols-2 lg:gap-8">
        <div className="flex flex-col items-start gap-2 py-8 text-neutral-white lg:pb-0">
          {/* this needs to become a link component variant */}
          <Link
            as={NextLink}
            className="cursor-pointer font-normal text-[20px] text-neutral-white leading-normal underline visited:text-[#7F92BF] hover:bg-[#EAF9F9] hover:text-[#083A3D] focus-visible:text-neutral-black active:text-neutral-black"
            href="/"
          >
            Home
          </Link>
          <Link
            as={NextLink}
            className="cursor-pointer font-normal text-[20px] text-neutral-white leading-normal underline visited:text-[#7F92BF] hover:bg-[#EAF9F9] hover:text-[#083A3D] focus-visible:text-neutral-black active:text-neutral-black"
            href="/terms-conditions"
          >
            Terms &amp; Conditions
          </Link>
        </div>

        <div className="-mx-[calc(50vw-50%)] border-black/25 border-t-4 lg:hidden" />

        <div className="flex flex-col items-start py-4 lg:items-end lg:py-8">
          <Image
            alt="Barbados Coat of Arms"
            className="block select-none"
            draggable="false"
            height={150}
            priority
            src="/images/coat-of-arms.png"
            width={150}
          />
          <Typography className="text-white" variant="paragraph">
            &copy; 2025 Government of Barbados
          </Typography>
        </div>
      </div>
    </div>
  </footer>
);
