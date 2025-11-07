import { Logo } from "@govtech-bb/react";
import Link from "next/link";
import { Banner } from "./banner";

export const Header = () => (
  <div className="bg-blue-100">
    <Banner />
    <header className="rounded-t-3xl bg-yellow-100">
      <div className="container">
        <div className="flex items-center gap-3 py-4 lg:py-8">
          <Link href="/">
            <Logo className="h-[27px] w-[276px] lg:h-[35px] lg:w-[355px]" />
          </Link>
        </div>
      </div>
    </header>
  </div>
);
