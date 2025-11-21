import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Section,
  Text,
} from "@react-email/components";
import type { PassportReplacementFormData } from "@/components/forms/passport-replacement/schema";

type PassportReplacementEmailProps = {
  formData: PassportReplacementFormData;
  submittedAt: string;
  transactionNumber: string;
  amountPaid: string;
  paymentProcessor: string;
};

const REASON_LABELS: Record<
  PassportReplacementFormData["reasonForReplacement"],
  string
> = {
  lost: "Lost",
  stolen: "Stolen",
  damaged: "Damaged",
  expired: "Expired",
};

export function PassportReplacementEmail({
  formData,
  submittedAt,
  transactionNumber,
  amountPaid,
  paymentProcessor,
}: PassportReplacementEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            border: "1px solid #e0e0e0",
            padding: "30px",
          }}
        >
          <Heading as="h1" style={{ color: "#003087", fontSize: "24px" }}>
            New Passport Replacement Application
          </Heading>

          <Text style={{ color: "#333", fontSize: "14px" }}>
            A new passport replacement application has been submitted and
            payment has been confirmed.
          </Text>

          <Hr style={{ borderColor: "#e0e0e0", margin: "20px 0" }} />

          {/* Payment Information */}
          <Section style={{ marginTop: "20px" }}>
            <Heading as="h3" style={{ color: "#003087", fontSize: "18px" }}>
              Payment Information
            </Heading>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    <strong>Transaction ID:</strong>
                  </td>
                  <td style={{ padding: "5px 10px" }}>{transactionNumber}</td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    <strong>Amount Paid:</strong>
                  </td>
                  <td style={{ padding: "5px 10px" }}>${amountPaid} BBD</td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    <strong>Payment Method:</strong>
                  </td>
                  <td style={{ padding: "5px 10px" }}>{paymentProcessor}</td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    <strong>Reference Number:</strong>
                  </td>
                  <td style={{ padding: "5px 10px" }}>
                    {formData.referenceNumber}
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* Applicant Information */}
          <Section style={{ marginTop: "20px" }}>
            <Heading as="h3" style={{ color: "#003087", fontSize: "18px" }}>
              Applicant Information
            </Heading>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    <strong>Full Name:</strong>
                  </td>
                  <td style={{ padding: "5px 10px" }}>{formData.fullName}</td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    <strong>Email:</strong>
                  </td>
                  <td style={{ padding: "5px 10px" }}>{formData.email}</td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    <strong>Phone Number:</strong>
                  </td>
                  <td style={{ padding: "5px 10px" }}>
                    {formData.phoneNumber}
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* Passport Details */}
          <Section style={{ marginTop: "20px" }}>
            <Heading as="h3" style={{ color: "#003087", fontSize: "18px" }}>
              Passport Details
            </Heading>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    <strong>Current Passport Number:</strong>
                  </td>
                  <td style={{ padding: "5px 10px" }}>
                    {formData.currentPassportNumber}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    <strong>Reason for Replacement:</strong>
                  </td>
                  <td style={{ padding: "5px 10px" }}>
                    {REASON_LABELS[formData.reasonForReplacement]}
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* Delivery Information */}
          <Section style={{ marginTop: "20px" }}>
            <Heading as="h3" style={{ color: "#003087", fontSize: "18px" }}>
              Delivery Information
            </Heading>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    <strong>Delivery Address:</strong>
                  </td>
                  <td style={{ padding: "5px 10px" }}>
                    {formData.deliveryAddress}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    <strong>Parish:</strong>
                  </td>
                  <td style={{ padding: "5px 10px" }}>{formData.parish}</td>
                </tr>
              </tbody>
            </table>
          </Section>

          <Hr style={{ borderColor: "#e0e0e0", margin: "20px 0" }} />

          <Text style={{ color: "#666", fontSize: "12px" }}>
            <strong>Submitted:</strong> {submittedAt}
          </Text>

          <Text style={{ color: "#666", fontSize: "12px", marginTop: "10px" }}>
            This is an automated notification from Alpha.Gov.bb
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
