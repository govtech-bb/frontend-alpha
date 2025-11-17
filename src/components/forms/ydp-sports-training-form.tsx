import { Suspense } from "react";
import YdpSportsTrainingFormApp from "./ydp-sports-training/ydp-sports-training-form";

export default function YdpSportsTrainingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <YdpSportsTrainingFormApp />
    </Suspense>
  );
}
