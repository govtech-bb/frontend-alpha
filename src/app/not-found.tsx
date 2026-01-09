import { Link } from "@govtech-bb/react";
import NextLink from "next/link";
import { Typography } from "@/components/ui/typography";

export default function NotFound() {
  return (
    <div className="container space-y-6 pt-4 pb-8 lg:py-8">
      <Typography variant="h1">Page not found</Typography>
      <Typography variant="paragraph">
        If you typed the web address, check it is correct.
      </Typography>
      <Typography variant="paragraph">
        If you pasted the web address, check you copied the entire address.
      </Typography>
      <Typography variant="paragraph">
        If the web address is correct or you selected a link or button, please
        submit this issue{" "}
        <Link
          as={NextLink}
          className="text-[24px]"
          href={"/feedback"}
          variant={"secondary"}
        >
          using our feedback form
        </Link>
      </Typography>
    </div>
  );
}
