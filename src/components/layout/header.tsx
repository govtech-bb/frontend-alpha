import Image from "next/image";
import { Banner } from "./banner";

export const Header = () => {
  return (
    <div>
      <Banner />
      <header className="flex items-center gap-3 bg-[#FFC726] px-2 py-6">
        <Image alt="flag" height="24" src="/images/bb-flag.png" width="36" />
        <h1 className="font-bold text-blue-900 text-xl">
          Government of Barbados
        </h1>
      </header>
    </div>
  );
};
