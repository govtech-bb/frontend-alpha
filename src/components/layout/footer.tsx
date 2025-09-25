import Image from "next/image";
import { Typography } from "../ui/typography";

export const Footer = () => {
  return (
    <footer className="bg-[#00267F] px-4 py-8">
      <div className="flex items-end justify-between">
        <Typography className="text-white" variant="paragraph">
          © 2025 Government of Barbados
        </Typography>
        <Image
          alt="flag"
          height="100"
          src="/images/coat-of-arms.png"
          width="100"
        />
      </div>
    </footer>
  );
};
