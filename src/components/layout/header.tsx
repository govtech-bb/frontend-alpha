import Image from "next/image";
import Link from "next/link";
import { Banner } from "./banner";

export const Header = () => (
  <div className="bg-blue-dark">
    <Banner />
    <header className="rounded-t-3xl bg-yellow-bright">
      <div className="container">
        <div className="flex items-center gap-3 py-6">
          <Link href="/">
            <Image
              alt="flag"
              height="27"
              src="/images/government-of-barbados.svg"
              width="276"
            />
          </Link>
        </div>
      </div>
    </header>
  </div>
);
