import { Logo } from "@govtech-bb/react";
import Link from "next/link";
import { Banner } from "./banner";

export const Header = () => (
  <div>
    <Banner />
    <header className="bg-yellow-100">
      <div className="container">
        <div className="flex items-center gap-3 py-s lg:py-xm">
          <Link aria-label="Go to the alpha.gov.bb homepage" href="/">
            <Logo
              aria-hidden="true"
              className="h-6.75 w-69 lg:h-8.75 lg:w-88.75"
            />
          </Link>
          <nav aria-label="Primary" className="ml-auto">
            <ul className="flex items-center gap-xs sm:gap-s">
              <li>
                <Link className="font-medium hover:underline" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="font-medium hover:underline" href="/services">
                  Services
                </Link>
              </li>
              <li>
                <Link
                  className="font-medium hover:underline"
                  href="/ministries"
                >
                  Ministries
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  </div>
);
