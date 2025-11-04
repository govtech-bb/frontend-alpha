import type { Metadata } from "next";
import { RegisterBirthForm } from "@/components/forms/register-birth/register-birth-form";

export const metadata: Metadata = {
  title: "Register a Birth - GOV.BB",
  description:
    "Register the birth of your child with the Government of Barbados. Complete this online form to begin the birth registration process.",
};

export default function RegisterBirthPage() {
  return (
    <div className="bg-yellow-bright">
      <div className="overflow-hidden rounded-t-3xl bg-neutral-white">
        <div className="container space-y-4">
          <RegisterBirthForm />
        </div>
      </div>
    </div>
  );
}
