import { Button, Heading, Text } from "@govtech-bb/react";

type Props = {
  details: {
    service: string;
    amount: number;
  };
};

export const PaymentBlock = ({ details }: Props) => (
  <div className="space-y-6 bg-blue-10 p-6">
    <div className="border-gray-300 border-b-2 pb-6">
      <Heading as="h2">Complete your payment</Heading>
      <Text as="p">
        Please review and complete your payment to finalize your submission
      </Text>
    </div>
    <div>
      <Text as="p">
        <span className="font-bold">Service:</span> {details.service}
      </Text>
      <Text as="p">
        <span className="font-bold">Amount:</span> ${details.amount}
      </Text>
    </div>
    <Button>Continue to payment</Button>
    <Text as="p" className="text-gray-500 italic">
      You will be redirected to EZ Pay to securely complete your payment.
    </Text>
  </div>
);
