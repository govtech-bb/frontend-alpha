import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type FormSubmissionNotificationEmailProps = {
  formName: string;
  referenceNumber: string;
  submittedAt: string;
  applicantEmail: string | null;
  submissionRows: Array<{ label: string; value: string }>;
  ministryName?: string;
};

export function FormSubmissionNotificationEmail({
  formName,
  referenceNumber,
  submittedAt,
  applicantEmail,
  submissionRows,
  ministryName,
}: FormSubmissionNotificationEmailProps) {
  const currentYear = new Date().getFullYear();

  return (
    <Html lang="en">
      <Head />
      <Preview>New submission: {formName}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.topBar}>
            <Text style={styles.topBarText}>Form submission notification</Text>
          </Section>

          <Section style={styles.header}>
            <Text style={styles.headerText}>Government of Barbados</Text>
            {ministryName ? (
              <Text style={styles.headerSubText}>{ministryName}</Text>
            ) : null}
          </Section>

          <Section style={styles.content}>
            <Heading as="h1" style={styles.h1}>
              New Submission: {formName}
            </Heading>
            <Text style={styles.metaLine}>
              Reference:{" "}
              <strong style={styles.metaStrong}>{referenceNumber}</strong>
            </Text>
            <Text style={styles.metaLine}>Submitted: {submittedAt}</Text>
            <Text style={styles.metaLineWithGap}>
              Applicant email:{" "}
              {applicantEmail ? (
                <Link
                  href={`mailto:${applicantEmail}`}
                  style={styles.applicantLink}
                >
                  {applicantEmail}
                </Link>
              ) : (
                "Not provided"
              )}
            </Text>

            <Section style={styles.table}>
              <Section style={styles.tableHeaderRow}>
                <Text style={styles.tableHeaderLabel}>Field</Text>
                <Text style={styles.tableHeaderValue}>Value</Text>
              </Section>
              {submissionRows.map((row, index) => (
                <Section
                  key={`${row.label}-${index}`}
                  style={{
                    ...styles.tableRow,
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                  }}
                >
                  <Text style={styles.tableLabel}>{row.label}</Text>
                  <Text style={styles.tableValue}>{row.value}</Text>
                </Section>
              ))}
            </Section>

            <Text style={styles.disclaimer}>
              This is an automated submission from the online forms system.
            </Text>
          </Section>

          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              {`© ${currentYear} Government of Barbados · GovTech Barbados`}
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
    margin: "0 0 2px",
    fontSize: "18px",
    fontWeight: "700",
    color: "#000000",
  },
  headerSubText: {
    margin: "0",
    fontSize: "14px",
    color: "#000000",
  },
  content: {
    padding: "32px 24px",
  },
  h1: {
    margin: "0 0 8px",
    fontSize: "24px",
    lineHeight: "1.25",
  },
  metaLine: {
    margin: "0 0 4px",
    fontSize: "14px",
    color: "#595959",
  },
  metaLineWithGap: {
    margin: "0 0 24px",
    fontSize: "14px",
    color: "#595959",
  },
  metaStrong: {
    color: "#0e5f64",
  },
  applicantLink: {
    color: "#0e5f64",
  },
  table: {
    border: "1px solid #e0e4e9",
    margin: "0 0 24px",
  },
  tableHeaderRow: {
    backgroundColor: "#00267f",
    padding: "10px 14px",
  },
  tableHeaderLabel: {
    margin: "0",
    fontSize: "14px",
    fontWeight: "600",
    color: "#ffffff",
    display: "inline-block",
    width: "40%",
    verticalAlign: "top",
  },
  tableHeaderValue: {
    margin: "0",
    fontSize: "14px",
    fontWeight: "600",
    color: "#ffffff",
    display: "inline-block",
    width: "60%",
    verticalAlign: "top",
  },
  tableRow: {
    padding: "10px 14px",
    borderTop: "1px solid #e0e4e9",
  },
  tableLabel: {
    margin: "0",
    fontSize: "14px",
    fontWeight: "600",
    color: "#000000",
    display: "inline-block",
    width: "40%",
    verticalAlign: "top",
  },
  tableValue: {
    margin: "0",
    fontSize: "14px",
    color: "#000000",
    display: "inline-block",
    width: "60%",
    verticalAlign: "top",
  },
  disclaimer: {
    margin: "0",
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
