import { Logo } from "@govtech-bb/react";
import Link from "next/link";
import { Banner } from "./banner";

export const Header = () => (
  <div>
    <Banner />
    <header className="bg-yellow-100">
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
