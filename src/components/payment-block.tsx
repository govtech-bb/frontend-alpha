"use client";

import { Button, Heading, LinkButton, Text } from "@govtech-bb/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { EZPayVerifyResponse } from "@/lib/ezpay/types";

type PaymentData = {
  amount: number;
  description: string;
  numberOfCopies?: number;
  paymentUrl?: string;
  paymentToken?: string;
  paymentId?: string;
};

type Props = {
  paymentData: PaymentData;
  formId: string;
  customerEmail?: string;
  customerName?: string;
};

function PaymentRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-s">
      <Text as="p" className="flex-1 font-bold">
        {label}
      </Text>
      <Text as="p">{value}</Text>
    </div>
  );
}

export const PaymentBlock = ({ paymentData }: Props) => {
  const searchParams = useSearchParams();
  const [verifying, setVerifying] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<{
    status: "Success" | "Failed" | "Initiated" | null;
    transactionNumber?: string;
    amount?: string;
    processor?: string;
    details?: string;
  }>({ status: null });

  useEffect(() => {
    const verifyTransaction = async () => {
      const tx = searchParams?.get("tx");
      const ref = searchParams?.get("ref");

      if (tx && !paymentStatus.status) {
        setVerifying(true);

        try {
          const response = await fetch("/api/ezpay/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              transactionNumber: tx,
              reference: ref || undefined,
            }),
          });

          const result = await response.json();

          if (result.success && result.data) {
            const data: EZPayVerifyResponse = result.data;
            setPaymentStatus({
              status: data._status,
              transactionNumber: data._transaction_number,
              amount: data._amount,
              processor: data._processor,
              details: data._details,
            });

            if (window.history.replaceState) {
              const newUrl =
                window.location.pathname +
                window.location.search
                  .replace(/[?&](tx|ref)=[^&]*/g, "")
                  .replace(/^&/, "?")
                  .replace(/\?$/, "");
              window.history.replaceState({}, "", newUrl);
            }
          }
        } finally {
          setVerifying(false);
        }
      }
    };

    verifyTransaction();
  }, [searchParams, paymentStatus.status]);

  if (paymentStatus.status === "Success") {
    return (
      <div className="flex flex-col gap-xm rounded bg-green-00 p-xm text-white-00">
        <div className="flex flex-col gap-xxs border-grey-00 border-b pb-xm">
          <Heading as="h2">Your payment was successful</Heading>
          <Text as="p">
            Your payment has been received. We've sent a confirmation email to
            the address you provided.
          </Text>
        </div>
        <div className="flex flex-col gap-s">
          <PaymentRow label="Service:" value={paymentData.description} />
          <PaymentRow
            label="Amount:"
            value={`$${paymentStatus.amount || paymentData.amount.toFixed(2)}`}
          />
          {paymentStatus.transactionNumber && (
            <PaymentRow
              label="Reference number:"
              value={paymentStatus.transactionNumber}
            />
          )}
          <PaymentRow
            label="Date:"
            value={new Date().toLocaleDateString("en-GB")}
          />
        </div>
      </div>
    );
  }

  if (paymentStatus.status === "Failed") {
    return (
      <div className="flex flex-col gap-xm rounded bg-red-00 p-xm text-white-00">
        <div className="flex flex-col gap-xxs border-grey-00 border-b pb-xm">
          <Heading as="h2">
            Unfortunately, your payment was unsuccessful
          </Heading>
          <Text as="p">
            Your payment could not be processed. You have not been charged.
          </Text>
        </div>
        <Text as="p">
          Try paying again. If the problem continues, check with your bank or
          try a different payment method.
        </Text>
        {paymentData.paymentUrl && (
          <LinkButton href={paymentData.paymentUrl} variant="secondary">
            Try again
          </LinkButton>
        )}
      </div>
    );
  }

  if (paymentStatus.status === "Initiated") {
    return (
      <div className="flex flex-col gap-xm rounded bg-green-00 p-xm text-white-00">
        <div className="flex flex-col gap-xxs border-grey-00 border-b pb-xm">
          <Heading as="h2">Payment Initiated</Heading>
          <Text as="p">Your Direct Debit payment is being processed</Text>
        </div>
        <div className="flex flex-col gap-s">
          <PaymentRow label="Service:" value={paymentData.description} />
          <PaymentRow
            label="Amount:"
            value={`$${paymentStatus.amount || paymentData.amount.toFixed(2)}`}
          />
          {paymentData.numberOfCopies && (
            <PaymentRow
              label="Number of Copies:"
              value={String(paymentData.numberOfCopies)}
            />
          )}
          {paymentStatus.transactionNumber && (
            <PaymentRow
              label="Transaction Number:"
              value={paymentStatus.transactionNumber}
            />
          )}
        </div>
        <Text as="p" className="italic">
          Your payment will settle in approximately 5 business days.
        </Text>
      </div>
    );
  }

  const unitPrice =
    paymentData.numberOfCopies && paymentData.numberOfCopies > 0
      ? paymentData.amount / paymentData.numberOfCopies
      : null;

  return (
    <div className="flex flex-col gap-xm rounded bg-blue-10 p-xm">
      <div className="flex flex-col gap-xxs border-mid-grey-00 border-b pb-xm">
        <Heading as="h2">Complete your payment</Heading>
        <Text as="p">
          Please review and complete your payment to finalize your submission
        </Text>
      </div>

      <div className="flex flex-col gap-s">
        <PaymentRow label="Service:" value={paymentData.description} />
        {unitPrice !== null && (
          <PaymentRow label="Unit price:" value={`$${unitPrice.toFixed(2)}`} />
        )}
        {paymentData.numberOfCopies && (
          <PaymentRow
            label="Quantity:"
            value={String(paymentData.numberOfCopies)}
          />
        )}
        <PaymentRow
          label="Amount:"
          value={`$${Number(paymentData.amount).toFixed(2)}`}
        />
      </div>

      {paymentData.paymentUrl ? (
        verifying ? (
          <Button disabled type="button">
            Verifying...
          </Button>
        ) : (
          <LinkButton href={paymentData.paymentUrl} variant="primary">
            Continue to payment
          </LinkButton>
        )
      ) : null}
      <Text as="p" className="text-mid-grey-00 italic">
        You will be redirected to EZ Pay to securely complete your payment.
      </Text>
    </div>
  );
};
