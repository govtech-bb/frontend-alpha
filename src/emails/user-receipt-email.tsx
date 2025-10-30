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
import type { PartialBirthRegistrationFormData } from "@/components/forms/register-birth/types";

type UserReceiptEmailProps = {
  formData: PartialBirthRegistrationFormData;
  submittedAt: string;
  departmentEmail: string;
};

export function UserReceiptEmail({
  formData,
  submittedAt,
  departmentEmail,
}: UserReceiptEmailProps) {
  const childName = formData.child?.firstNames
    ? `${formData.child.firstNames} ${formData.child.lastName || ""}`.trim()
    : "your child";

  return (
    <Html>
      <Head />
      <Body
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          lineHeight: "1.6",
          color: "#333",
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "20px",
          }}
        >
          <Heading
            as="h1"
            style={{
              color: "#003087",
              borderBottom: "3px solid #FFB71B",
              paddingBottom: "10px",
            }}
          >
            Birth Registration Received
          </Heading>

          <Text>Dear {formData.mother?.firstName || "Parent/Guardian"},</Text>

          <Text>
            Thank you for submitting your birth registration application for{" "}
            <strong>{childName}</strong>.
          </Text>

          <Section
            style={{
              backgroundColor: "#f0f7ff",
              borderLeft: "4px solid #003087",
              padding: "15px",
              margin: "20px 0",
            }}
          >
            <Heading
              as="h3"
              style={{ marginTop: "0", fontSize: "18px", color: "#003087" }}
            >
              What we received
            </Heading>
            <Text>
              <strong>Date submitted:</strong> {submittedAt}
            </Text>
            {formData.child?.dateOfBirth && (
              <Text>
                <strong>Child's date of birth:</strong>{" "}
                {formData.child.dateOfBirth}
              </Text>
            )}
            <Text>
              <strong>Certificates requested:</strong>{" "}
              {formData.numberOfCertificates ?? 0}
            </Text>
          </Section>

          <Section
            style={{
              backgroundColor: "#fff9e6",
              borderLeft: "4px solid #FFB71B",
              padding: "15px",
              margin: "20px 0",
            }}
          >
            <Heading
              as="h3"
              style={{ marginTop: "0", fontSize: "18px", color: "#003087" }}
            >
              What happens next
            </Heading>
            <ol style={{ margin: "0", paddingLeft: "20px" }}>
              <li>
                <strong>Review:</strong> The Civil Registration Department will
                review your application
              </li>
              <li>
                <strong>Verification:</strong> We may contact you if we need any
                additional information
              </li>
              <li>
                <strong>Processing:</strong> Once approved, your birth
                certificate(s) will be prepared
              </li>
              <li>
                <strong>Collection:</strong> We will notify you when your
                certificate(s) are ready for collection
              </li>
            </ol>
          </Section>

          <Section style={{ marginTop: "20px" }}>
            <Heading as="h3" style={{ fontSize: "18px", color: "#003087" }}>
              Processing time
            </Heading>
            <Text>
              Birth registrations are typically processed within{" "}
              <strong>5-10 business days</strong>. We will contact you if there
              are any delays or if we need additional information.
            </Text>
          </Section>

          <Section style={{ marginTop: "20px" }}>
            <Heading as="h3" style={{ fontSize: "18px", color: "#003087" }}>
              Questions?
            </Heading>
            <Text>
              If you have any questions about your application, please contact:
            </Text>
            <ul style={{ margin: "0", paddingLeft: "20px" }}>
              <li>
                <strong>Email:</strong> {departmentEmail}
              </li>
              <li>
                <strong>Phone:</strong> (246) 535-5000
              </li>
              <li>
                <strong>Visit:</strong> General Register Office, Supreme Court,
                Whitepark Road, St. Michael
              </li>
            </ul>
          </Section>

          <Hr style={{ margin: "30px 0", borderTop: "1px solid #ccc" }} />
          <Text style={{ color: "#666", fontSize: "12px" }}>
            Government of Barbados - Civil Registration Department
            <br />
            This is an automated confirmation email. Please do not reply to this
            email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
