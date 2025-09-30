import Image from "next/image";
import { Typography } from "../ui/typography";

export const Footer = () => (
  <footer className="space-y-6 bg-[#00267F] px-4 pt-8 pb-4">
    <Image alt="flag" height="100" src="/images/coat-of-arms.png" width="100" />
    <Typography className="text-white" variant="paragraph">
      &copy; 2025 Government of Barbados
    </Typography>
  </footer>
);
