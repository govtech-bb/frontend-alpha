import Image from "next/image";
import { Banner } from "./banner";

export const Header = () => {
  return (
    <div className="bg-[#00267F]">
      <Banner />
      <header className="flex items-center gap-3 rounded-t-3xl bg-[#FFC726] px-4 pt-8">
        <Image
          alt="flag"
          height="21"
          src="/images/trident-vector.svg"
          width="19"
        />
        <h1 className="font-bold text-[21px]">Government of Barbados</h1>
      </header>
    </div>
  );
};
