import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Section,
  Text,
} from "@react-email/components";
import type { PartialBirthRegistrationFormData } from "@/components/forms/register-birth/types";
import { formatForDisplay } from "@/lib/dates";

type UserReceiptEmailProps = {
  formData: PartialBirthRegistrationFormData;
  submittedAt: string;
  departmentEmail: string;
};

export function UserReceiptEmail({
  formData,
  submittedAt,
}: UserReceiptEmailProps) {
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
            We have received your registration details
          </Heading>

          <Text>Dear {formData.mother?.firstName || "Parent/Guardian"},</Text>

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
                {formatForDisplay(formData.child.dateOfBirth)}
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
              What to do next
            </Heading>
            <Text>
              To finish registering the birth, you must go to the Registration
              Department in the district where the child was born to sign the
              birth register.
            </Text>
            <Text>
              The Registrations team will let you know when you can collect the
              child's birth certificate if you have ordered any.
            </Text>
            <Text>
              <strong>Find out about:</strong>
            </Text>
            <ul style={{ margin: "0", paddingLeft: "20px" }}>
              <li>
                <Link href="https://alpha.gov.bb/register-a-birth#where-to-register">
                  where you need to go to complete the registration
                </Link>
              </li>
              <li>
                <Link href="https://alpha.gov.bb/register-a-birth#late-registrations">
                  late registration fees
                </Link>
              </li>
            </ul>
          </Section>

          <Section style={{ marginTop: "20px" }}>
            <Heading as="h3" style={{ fontSize: "18px", color: "#003087" }}>
              Who should go to complete the registration
            </Heading>
            <Text>If you are:</Text>
            <ul style={{ margin: "0", paddingLeft: "20px" }}>
              <li>
                married to each other, the father must register and the mother
                can attend
              </li>
              <li>
                not married to each other, the mother must register the birth
                but it is not necessary for the father to attend
              </li>
              <li>
                not married to each other but the father wants to be named on
                the birth record, both parents must register the birth together
              </li>
            </ul>
            <Text>You do not need to take the baby.</Text>
          </Section>

          <Section style={{ marginTop: "20px" }}>
            <Heading as="h3" style={{ fontSize: "18px", color: "#003087" }}>
              What to bring
            </Heading>
            <Text>You need to show:</Text>
            <ol style={{ margin: "0", paddingLeft: "20px" }}>
              <li>
                Your child's medical book from the hospital or birthing centre
                (sometimes called the green book or immunisation book).
              </li>
              <li>
                A valid form of photo identification for each parent who will be
                named on the birth record.
              </li>
              <li>
                Your Barbados National ID card, valid passport or other
                government-issued ID if you are a Barbadian citizen.
                Non-Barbadian nationals must show their valid passport.
              </li>
              <li>
                Your original marriage certificate if you are married to the
                child's other parent.
              </li>
            </ol>

            <Heading
              as="h4"
              style={{ fontSize: "16px", color: "#003087", marginTop: "15px" }}
            >
              Parents who are minors
            </Heading>
            <Text>
              If you are a mother or a father and you are under 16 years old,
              you are considered a minor. You must be accompanied by your
              parent(s) or guardian(s).
            </Text>
            <Text>
              <strong>If you have a valid passport, you must bring:</strong>
            </Text>
            <ul style={{ margin: "0", paddingLeft: "20px" }}>
              <li>your valid passport</li>
              <li>your original birth certificate</li>
              <li>the child's medical book (green book)</li>
            </ul>
            <Text>
              <strong>
                If you do not have a valid passport, you must bring:
              </strong>
            </Text>
            <ul style={{ margin: "0", paddingLeft: "20px" }}>
              <li>your minor's identification card</li>
              <li>your original birth certificate</li>
              <li>the child's medical book (green book)</li>
              <li>an identification letter signed by a Justice of the Peace</li>
            </ul>
          </Section>

          <Section style={{ marginTop: "20px" }}>
            <Heading as="h3" style={{ fontSize: "18px", color: "#003087" }}>
              If you need support
            </Heading>
            <Text>
              If you need help registering a birth, for example, you are unable
              to sign the register in person, contact the Registration
              Department in Bridgetown as soon as possible after the child is
              born.
            </Text>
            <Text>
              <strong>Registration Department</strong>
            </Text>
            <Text style={{ margin: "0" }}>Supreme Court Complex</Text>
            <Text style={{ margin: "0" }}>Whitepark Road</Text>
            <Text style={{ margin: "0" }}>St. Michael</Text>
            <Text style={{ margin: "0" }}>(246) 535-9700</Text>
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
