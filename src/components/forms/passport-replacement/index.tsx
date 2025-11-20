import { Suspense } from "react";
import { PassportReplacementForm } from "./passport-replacement-form";

export default function PassportReplacementPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PassportReplacementForm />
    </Suspense>
  );
}
