import { Suspense } from "react";
import MentorshipApplicationFormApp from "./mentorship-application/mentorship-application-form";

export default function MentorshipApplicationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MentorshipApplicationFormApp />
    </Suspense>
  );
}
