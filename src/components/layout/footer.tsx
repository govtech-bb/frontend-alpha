import { Link } from "@govtech-bb/react";
import Image from "next/image";
import NextLink from "next/link";
import { Typography } from "../ui/typography";

export const Footer = () => (
  <footer className="bg-blue-100">
    <div className="container">
      <div className="grid lg:grid-cols-2 lg:gap-8">
        <div className="flex flex-col items-start gap-2 py-8 lg:pb-0">
          <Link as={NextLink} href="/" variant={"tertiary"}>
            Home
          </Link>
          <Link as={NextLink} href="/terms-conditions" variant={"tertiary"}>
            Terms &amp; Conditions
          </Link>
        </div>

        <div className="-mx-[calc(50vw-50%)] border-black/25 border-t-4 lg:hidden" />

        <div className="flex flex-col items-start py-4 lg:items-end lg:py-8">
          <Image
            alt="Barbados Coat of Arms"
            className="block select-none"
            draggable="false"
            height={104}
            src="/images/coat-of-arms.png"
            width={112}
          />
          <Typography className="text-white" variant="paragraph">
            &copy; 2025 Government of Barbados
          </Typography>
        </div>
      </div>
    </div>
  </footer>
);
