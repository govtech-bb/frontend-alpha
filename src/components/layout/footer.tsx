import Image from "next/image";
import Link from "next/link";
import { Typography } from "../ui/typography";

export const Footer = () => (
  <footer className="bg-blue-dark">
    <div className="container">
      <div className="grid lg:grid-cols-2 lg:gap-8">
        <div className="flex flex-col gap-2 py-8 text-white lg:pb-0">
          <Link
            className="cursor-pointer font-normal text-[20px] leading-[150%] underline"
            href="/"
          >
            Home
          </Link>
          <Link
            className="cursor-pointer font-normal text-[20px] leading-[150%] underline"
            href="/terms-conditions"
          >
            Terms &amp; Conditions
          </Link>
        </div>

        <div className="-mx-[calc(50vw-50%)] border-black/25 border-t-4 lg:hidden" />

        <div className="flex flex-col items-start gap-6 pt-8 pb-4 lg:items-end lg:pb-8">
          <Image
            alt="Barbados Coat of Arms"
            className="block"
            height={100}
            src="/images/coat-of-arms.png"
            width={100}
          />
          <Typography className="text-white" variant="paragraph">
            &copy; 2025 Government of Barbados
          </Typography>
        </div>
      </div>
    </div>
  </footer>
);
