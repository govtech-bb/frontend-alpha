import { Logo } from "@govtech-bb/react";
import Link from "next/link";
import { Banner } from "./banner";
import { MobileNav } from "./mobile-nav";

export const Header = () => (
  <div>
    <Banner />
    <header className="relative bg-yellow-100">
      <div className="container">
        <div className="flex items-center gap-3 py-s lg:py-xm">
          <Link aria-label="Go to the alpha.gov.bb homepage" href="/">
            <Logo
              aria-hidden="true"
              className="h-6.75 w-69 lg:h-8.75 lg:w-88.75"
            />
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  </div>
);
