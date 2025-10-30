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
import type {
  ChildDetails,
  PartialBirthRegistrationFormData,
  PersonDetails,
} from "@/components/forms/register-birth/types";

type DepartmentNotificationEmailProps = {
  formData: PartialBirthRegistrationFormData;
  submittedAt: string;
};

function PersonDetailsSection({
  person,
  label,
}: {
  person: Partial<PersonDetails> | undefined;
  label: string;
}) {
  if (!person) return null;

  return (
    <Section style={{ marginTop: "20px" }}>
      <Heading as="h3" style={{ color: "#003087", fontSize: "18px" }}>
        {label}
      </Heading>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          {person.firstName && (
            <tr>
              <td
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <strong>First name:</strong>
              </td>
              <td style={{ padding: "5px 10px" }}>{person.firstName}</td>
            </tr>
          )}
          {person.middleName && (
            <tr>
              <td
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <strong>Middle name:</strong>
              </td>
              <td style={{ padding: "5px 10px" }}>{person.middleName}</td>
            </tr>
          )}
          {person.lastName && (
            <tr>
              <td
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <strong>Last name:</strong>
              </td>
              <td style={{ padding: "5px 10px" }}>{person.lastName}</td>
            </tr>
          )}
          {person.hadOtherSurname === "yes" && person.otherSurname && (
            <tr>
              <td
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <strong>Previous surname:</strong>
              </td>
              <td style={{ padding: "5px 10px" }}>{person.otherSurname}</td>
            </tr>
          )}
          {person.dateOfBirth && (
            <tr>
              <td
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <strong>Date of birth:</strong>
              </td>
              <td style={{ padding: "5px 10px" }}>{person.dateOfBirth}</td>
            </tr>
          )}
          {person.address && (
            <tr>
              <td
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <strong>Address:</strong>
              </td>
              <td style={{ padding: "5px 10px" }}>{person.address}</td>
            </tr>
          )}
          {person.nationalRegistrationNumber && (
            <tr>
              <td
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <strong>National registration number:</strong>
              </td>
              <td style={{ padding: "5px 10px" }}>
                {person.nationalRegistrationNumber}
              </td>
            </tr>
          )}
          {person.passportNumber && (
            <tr>
              <td
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <strong>Passport number:</strong>
              </td>
              <td style={{ padding: "5px 10px" }}>{person.passportNumber}</td>
            </tr>
          )}
          {person.occupation && (
            <tr>
              <td
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <strong>Occupation:</strong>
              </td>
              <td style={{ padding: "5px 10px" }}>{person.occupation}</td>
            </tr>
          )}
        </tbody>
      </table>
    </Section>
  );
}

function ChildDetailsSection({
  child,
}: {
  child: Partial<ChildDetails> | undefined;
}) {
  if (!child) return null;

  return (
    <Section style={{ marginTop: "20px" }}>
      <Heading as="h3" style={{ color: "#003087", fontSize: "18px" }}>
        Child's Details
      </Heading>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          {child.firstNames && (
            <tr>
              <td
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <strong>First name(s):</strong>
              </td>
              <td style={{ padding: "5px 10px" }}>{child.firstNames}</td>
            </tr>
          )}
          {child.middleNames && (
            <tr>
              <td
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <strong>Middle name(s):</strong>
              </td>
              <td style={{ padding: "5px 10px" }}>{child.middleNames}</td>
            </tr>
          )}
          {child.lastName && (
            <tr>
              <td
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <strong>Last name:</strong>
              </td>
              <td style={{ padding: "5px 10px" }}>{child.lastName}</td>
            </tr>
          )}
          {child.dateOfBirth && (
            <tr>
              <td
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <strong>Date of birth:</strong>
              </td>
              <td style={{ padding: "5px 10px" }}>{child.dateOfBirth}</td>
            </tr>
          )}
          {child.sexAtBirth && (
            <tr>
              <td
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <strong>Sex at birth:</strong>
              </td>
              <td style={{ padding: "5px 10px" }}>{child.sexAtBirth}</td>
            </tr>
          )}
          {child.parishOfBirth && (
            <tr>
              <td
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <strong>Parish of birth:</strong>
              </td>
              <td style={{ padding: "5px 10px" }}>{child.parishOfBirth}</td>
            </tr>
          )}
        </tbody>
      </table>
    </Section>
  );
}

export function DepartmentNotificationEmail({
  formData,
  submittedAt,
}: DepartmentNotificationEmailProps) {
  const marriageStatusText =
    formData.marriageStatus === "yes"
      ? "Married"
      : formData.marriageStatus === "no"
        ? "Not married"
        : "Not specified";

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
            maxWidth: "800px",
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
            New Birth Registration Submission
          </Heading>
          <Text>
            <strong>Submitted:</strong> {submittedAt}
          </Text>

          <Section style={{ marginTop: "30px" }}>
            <Heading as="h2" style={{ color: "#003087", fontSize: "20px" }}>
              Marriage Status
            </Heading>
            <Text>
              <strong>{marriageStatusText}</strong>
            </Text>
          </Section>

          <PersonDetailsSection
            label="Mother's Details"
            person={formData.mother}
          />
          {formData.father && (
            <PersonDetailsSection
              label="Father's Details"
              person={formData.father}
            />
          )}
          <ChildDetailsSection child={formData.child} />

          <Section style={{ marginTop: "20px" }}>
            <Heading as="h3" style={{ color: "#003087", fontSize: "18px" }}>
              Certificates Requested
            </Heading>
            <Text>
              <strong>Number of certificates:</strong>{" "}
              {formData.numberOfCertificates ?? 0}
            </Text>
          </Section>

          <Section style={{ marginTop: "20px" }}>
            <Heading as="h3" style={{ color: "#003087", fontSize: "18px" }}>
              Contact Information
            </Heading>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {formData.email && (
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
                )}
                {formData.wantContact === "yes" && formData.phoneNumber && (
                  <tr>
                    <td
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#f5f5f5",
                      }}
                    >
                      <strong>Phone number:</strong>
                    </td>
                    <td style={{ padding: "5px 10px" }}>
                      {formData.phoneNumber}
                    </td>
                  </tr>
                )}
                {formData.wantContact && (
                  <tr>
                    <td
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#f5f5f5",
                      }}
                    >
                      <strong>Wants phone contact:</strong>
                    </td>
                    <td style={{ padding: "5px 10px" }}>
                      {formData.wantContact === "yes" ? "Yes" : "No"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Section>

          <Hr style={{ margin: "30px 0", borderTop: "1px solid #ccc" }} />
          <Text style={{ color: "#666", fontSize: "12px" }}>
            Sent from Government of Barbados Birth Registration Service
            <br />
            This email contains sensitive personal information - handle with
            care
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
