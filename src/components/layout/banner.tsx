import Image from "next/image";
import { Typography } from "../ui/typography";

export const Banner = () => {
  return (
    <div className="flex items-center justify-between bg-[#FFB700] px-4 py-[7px]">
      <span className="flex items-center gap-2">
        <Image
          alt="flag"
          height="16"
          src="/images/coat-of-arms.png"
          width="17"
        />
        <Typography variant="small">Official government website</Typography>
      </span>

      <Typography className="underline" variant="small">
        Learn More
      </Typography>
    </div>
  );
};
