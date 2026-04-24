import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type FormSubmissionConfirmationEmailProps = {
  formName: string;
  referenceNumber: string;
  ministryName?: string;
};

export function FormSubmissionConfirmationEmail({
  formName,
  referenceNumber,
  ministryName,
}: FormSubmissionConfirmationEmailProps) {
  const currentYear = new Date().getFullYear();

  return (
    <Html lang="en">
      <Head />
      <Preview>Your {formName} application was received</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.topBar}>
            <Text style={styles.topBarText}>
              Official communication from the Government of Barbados
            </Text>
          </Section>

          <Section style={styles.header}>
            <Text style={styles.headerText}>Government of Barbados</Text>
          </Section>

          <Section style={styles.content}>
            <Heading as="h1" style={styles.h1}>
              Your request has been received
            </Heading>
            <Text style={styles.p}>
              Thank you for submitting your <strong>{formName}</strong>. We have
              received your application and it is now being processed.
            </Text>

            <Section style={styles.referenceBox}>
              <Text style={styles.referenceLabel}>Your reference number</Text>
              <Text style={styles.referenceNumber}>{referenceNumber}</Text>
              <Text style={styles.referenceHelp}>
                Please keep this for your records.
              </Text>
            </Section>

            <Heading as="h2" style={styles.h2}>
              What happens next
            </Heading>
            <Text style={styles.p}>
              Your request will be reviewed by{" "}
              {ministryName ?? "the responsible ministry"}. We will contact you
              if we need more information.
            </Text>
            <Text style={styles.p}>
              If you have questions, contact{" "}
              {ministryName ?? "the responsible ministry"} and include your
              reference number.
            </Text>

            <Text style={styles.disclaimer}>
              This is an automated email. Please do not reply directly to this
              message.
            </Text>
          </Section>

          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              {`© ${currentYear} Government of Barbados. All rights reserved.`}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    margin: "0",
    padding: "24px 16px",
    backgroundColor: "#f5f5f5",
    fontFamily:
      "Figtree, -apple-system, system-ui, 'Segoe UI', Roboto, sans-serif",
    color: "#000000",
  },
  container: {
    maxWidth: "600px",
    width: "100%",
    margin: "0 auto",
    backgroundColor: "#ffffff",
  },
  topBar: {
    backgroundColor: "#00267f",
    padding: "8px 24px",
  },
  topBarText: {
    margin: "0",
    fontSize: "13px",
    lineHeight: "1.4",
    color: "#ffffff",
  },
  header: {
    backgroundColor: "#ffc726",
    padding: "16px 24px",
  },
  headerText: {
    margin: "0",
    fontSize: "18px",
    fontWeight: "700",
    color: "#000000",
  },
  content: {
    padding: "32px 24px",
  },
  h1: {
    margin: "0 0 16px",
    fontSize: "24px",
    lineHeight: "1.25",
  },
  h2: {
    margin: "0 0 12px",
    fontSize: "18px",
    lineHeight: "1.3",
  },
  p: {
    margin: "0 0 12px",
    fontSize: "16px",
    lineHeight: "1.6",
  },
  referenceBox: {
    backgroundColor: "#eaf9f9",
    borderLeft: "4px solid #0e5f64",
    padding: "16px 20px",
    margin: "0 0 24px",
  },
  referenceLabel: {
    margin: "0 0 4px",
    fontSize: "14px",
    color: "#595959",
  },
  referenceNumber: {
    margin: "0 0 8px",
    fontSize: "28px",
    fontWeight: "700",
    color: "#0e5f64",
  },
  referenceHelp: {
    margin: "0",
    fontSize: "14px",
    color: "#595959",
  },
  disclaimer: {
    margin: "16px 0 0",
    fontSize: "14px",
    color: "#595959",
  },
  footer: {
    backgroundColor: "#00267f",
    padding: "16px 24px",
  },
  footerText: {
    margin: "0",
    color: "#ffffff",
    fontSize: "13px",
  },
} as const;
