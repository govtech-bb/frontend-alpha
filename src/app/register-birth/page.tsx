import type { Metadata } from "next";
import { RegisterBirthForm } from "@/components/forms/register-birth/register-birth-form";
import { BackButton } from "@/components/layout/back-button";
import { Typography } from "@/components/ui/typography";

export const metadata: Metadata = {
  title: "Register a Birth - GOV.BB",
  description:
    "Register the birth of your child with the Government of Barbados. Complete this online form to begin the birth registration process.",
};

export default function RegisterBirthPage() {
  return (
    <div className="overflow-hidden bg-neutral-white lg:rounded-t-3xl">
      <div className="container space-y-4">
        <BackButton className="py-6 lg:pb-0" />
        <Typography variant="h1">Register a birth</Typography>

        <div className="border-blue-bright border-r-4 border-l-4 bg-blue-light/30 px-4 py-3">
          <Typography variant="paragraph">
            This service is in{" "}
            <span className="capitalize underline">Alpha</span>.
          </Typography>
        </div>

        <Typography variant="paragraph">
          Use this service to register the birth of a child born in Barbados.
        </Typography>

        <RegisterBirthForm />
      </div>
    </div>
  );
}
