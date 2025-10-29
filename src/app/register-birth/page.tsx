import type { Metadata } from "next";
import { RegisterBirthForm } from "@/components/forms/register-birth/register-birth-form";
import { BackButton } from "@/components/layout/back-button";

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
        <RegisterBirthForm />
      </div>
    </div>
  );
}
