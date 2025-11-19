import { Suspense } from "react";
import { RegisterBirthForm } from "./register-birth/register-birth-form";

export default function RegisterBirthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterBirthForm />
    </Suspense>
  );
}
