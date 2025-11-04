import type { Metadata } from "next";
import { Suspense } from "react";
import { RegisterBirthForm } from "@/components/forms/register-birth/register-birth-form";

export const metadata: Metadata = {
  title: "Register a Birth - GOV.BB",
  description:
    "Register the birth of your child with the Government of Barbados. Complete this online form to begin the birth registration process.",
};

export default function RegisterBirthPage() {
  return (
    <div className="bg-yellow-bright">
      <div className="overflow-hidden bg-neutral-white lg:rounded-t-3xl">
        <div className="container space-y-4">
          <Suspense fallback={<div>Loading...</div>}>
            <RegisterBirthForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
