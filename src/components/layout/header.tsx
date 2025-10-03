import Image from "next/image";
import { Banner } from "./banner";

export const Header = () => (
  <div className="bg-[#00267F]">
    <Banner />
    <header className="flex items-center gap-3 rounded-t-3xl bg-[#FFC726] px-4 py-6">
      <Image
        alt="flag"
        height="27"
        src="/images/government-of-barbados.svg"
        width="276"
      />
    </header>
  </div>
);
