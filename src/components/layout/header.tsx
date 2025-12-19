import { Logo } from "@govtech-bb/react";
import Link from "next/link";
import { Banner } from "./banner";

export const Header = () => (
  <div>
    <Banner />
    <header className="bg-yellow-100">
      <div className="container">
        <div className="flex items-center py-s lg:py-xm">
          <Link href="/">
            <Logo className="h-6.75 w-69 lg:h-8.75 lg:w-88.75" />
          </Link>
        </div>
      </div>
    </header>
  </div>
);
