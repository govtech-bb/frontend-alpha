import { Heading, Text } from "@govtech-bb/react";
import { SimpleFeedbackForm } from "@/components/forms/simple-feedback-form";

export default function FeedbackPage() {
  return (
    <>
      <div className="mb-6 space-y-6">
        <Heading as="h1">Help us improve alpha.gov.bb</Heading>
        <div className="space-y-3">
          <Text as="p">
            Your feedback will help us make it clearer, simpler and faster to
            find and use public services.
          </Text>
          <Text as="p">Do not include personal information.</Text>
        </div>
      </div>
      <SimpleFeedbackForm />
    </>
  );
}
