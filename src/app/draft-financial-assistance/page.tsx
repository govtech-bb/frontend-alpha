import { Link } from "@govtech-bb/react";
import NextLink from "next/link";
import { BackButton } from "@/components/layout/back-button";
import { HelpfulBox } from "@/components/layout/helpful-box";
import { StageBanner } from "@/components/stage-banner";

export default function Home() {
  return (
    <>
      <style>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      <div className="container py-4 lg:pt-6">
        <BackButton />
        <div className="lg:grid lg:grid-cols-3 lg:gap-16">
          <div className="space-y-6 lg:col-span-2 lg:space-y-8">
            <div className="space-y-4 pt-6 lg:space-y-6 lg:pt-16">
              <h1 className="font-bold text-[56px] leading-[1.15]">
                Apply for financial assistance
              </h1>
              <StageBanner stage="alpha" />
              <div className="border-neutral-grey/50 border-b-4 pb-3 text-[16px] text-neutral-midgrey leading-normal">
                Last updated on 15 October 2025
              </div>
            </div>
            <div className="space-y-4 font-normal text-[20px] leading-[1.7]">
              <p>
                If you live in Barbados and need financial help you can apply
                for financial assistance.
              </p>
              <p>
                If you need help with things like food, clothing, burials,
                assistive devices (for example, dentures, hearing aids and
                spectacles), as well as payment of utility bills and house rent,
                you can apply for assistance in-kind.
              </p>
              <p>
                A welfare officer will assess your needs under the National
                Assistance framework and make a recommendation to determine if
                you should be granted assistance.
              </p>
            </div>

            <div className="space-y-4 font-normal text-[20px] leading-[1.7]">
              <h2
                className="font-bold text-[40px] leading-[1.25]"
                id="who-can-use-this-service"
              >
                Who can use this service
              </h2>
              <p>
                You can apply for assistance for a range of reasons, including
                if you:
              </p>
              <ul className="list-disc space-y-4 pl-7">
                <li>are unemployed or underemployed</li>
                <li>are elderly</li>
                <li>
                  have a disability but are not receiving National Insurance and
                  Social Security Service (NISS) benefits
                </li>
                <li>
                  have children or dependents who you are struggling to support
                </li>
                <li>
                  have finished school and are unemployed but have enrolled in a
                  tertiary institution
                </li>
                <li>are homeless</li>
                <li>are the victim of a disaster or an accident</li>
              </ul>
            </div>

            <div className="space-y-4 font-normal text-[20px] leading-[1.7]">
              <h2
                className="font-bold text-[40px] leading-[1.25]"
                id="how-to-apply"
              >
                How to apply for financial assistance
              </h2>
              <h3
                className="font-bold text-[24px] leading-[1.25]"
                id="apply-online-or-in-person"
              >
                Apply online or in person
              </h3>
              <p>You can apply for financial assistance either by:</p>
              <ol className="list-decimal space-y-4 pl-7">
                <li>
                  <p>
                    Going to the welfare office in the parish where you live and
                    completing a paper form (the National Assistance application
                    form). At the moment, the form does not ask for your contact
                    number but you must include one so an officer can reach you
                    and arrange an interview.
                  </p>
                  <p className="my-4 font-bold">Welfare offices</p>
                  <address className="mb-4 border-blue-10 border-l-2 pl-4 not-italic leading-[1.25]">
                    <p>
                      Weymouth Corporate Center
                      <br />
                      Roebuck St. Bridgetown
                      <br />
                      St. Michael
                    </p>
                  </address>

                  <address className="mb-4 border-blue-10 border-l-2 pl-4 not-italic leading-[1.25]">
                    <p>
                      Republic Bank Building,
                      <br />
                      Chapel St,
                      <br />
                      Speightstown,
                      <br />
                      Saint Peter
                    </p>
                  </address>

                  <address className="mb-4 border-blue-10 border-l-2 pl-4 not-italic leading-[1.25]">
                    <p>
                      Country Road
                      <br />
                      Bridgetown
                      <br />
                      St. Michael
                    </p>
                  </address>
                </li>
                <li>
                  Completing the online form:{" "}
                  <Link
                    as={NextLink}
                    href="https://forms.office.com/Pages/ResponsePage.aspx?id=web15Rec90GA3HzH5NzlKVed1WgQV8FEk5jHDILeRuRUNTIzQ0QyODA2OEpTOUkyVzNVVEFWS1RJMi4u"
                  >
                    Application for National Assistance
                  </Link>
                  . It will automatically be submitted to the department.
                </li>
              </ol>
            </div>

            <div className="space-y-4 font-normal text-[20px] leading-[1.7]">
              <h3
                className="font-bold text-[24px] leading-[1.25]"
                id="what-to-bring"
              >
                What to bring
              </h3>
              <p>
                If you use the online form to apply, an officer will contact you
                and let you know how to share your supporting information.
              </p>
              <p>If you apply in person, you will need to bring:</p>
              <ol className="list-decimal space-y-4 pl-7">
                <li>Your completed National Assistance application form.</li>
                <li>
                  Your national identification card. If you are applying on
                  behalf of a child, you must also show their national
                  identification card.
                </li>
                <li>
                  Bank or credit union details so financial support could be
                  sent if you are eligible. (The electronic transfer of funds is
                  not available yet but details are being taken in preparation).
                </li>
                <li>
                  Certificates or documents that are relevant to the assistance
                  you are applying for. For example, proof of your income or
                  unemployment, details of dependents, a medical form completed
                  by your doctor, proof of your expenditure, for example, your
                  utility bills.
                </li>
              </ol>
              <p>
                If you are applying for health-related financial assistance, the
                welfare officer assigned to your case will issue you a medical
                form to take to your doctor to be completed.
              </p>
            </div>

            <div className="space-y-4 font-normal text-[20px] leading-[1.7]">
              <h3
                className="font-bold text-[24px] leading-[1.25]"
                id="after-you-have-applied"
              >
                After you have applied
              </h3>
              <p>
                A welfare officer aims to complete their assessment within 6
                weeks of receiving your application.
              </p>
              <p>
                If you applied through the online form, they will let you know
                which supporting information they need, and where to send it.
              </p>
              <p>
                The officer may ask you to take part in a phone or online
                interview, office interview or arrange a time for them to visit
                you at your home.
              </p>
              <p>
                Following their investigation, the officer will compile a report
                on your circumstances and make a recommendation to a senior
                welfare officer to approve or reject the application. If they
                approve it, your bank information and the details of your
                payment will be forwarded to Accounts.
              </p>
            </div>

            <div className="space-y-4 font-normal text-[20px] leading-[1.7]">
              <h2
                className="font-bold text-[40px] leading-[1.25]"
                id="no-address-or-bank-account"
              >
                No address and/or no bank account
              </h2>
              <p>
                If your application is approved and you do not live at a fixed
                address, you can make arrangements through the Post Office to
                receive your cheque. It is also possible to send cheques in care
                of a trusted friend or family member. The Department can also
                facilitate banking arrangements on your behalf.
              </p>
            </div>

            <div className="space-y-4 font-normal text-[20px] leading-[1.7]">
              <h2
                className="font-bold text-[40px] leading-[1.25]"
                id="reassessment-and-evaluation"
              >
                Reassessment and evaluation
              </h2>
              <p>
                Assistance is usually granted for 3 to 6 months. You can expect
                to have a review before the end of that period to determine
                whether an extension is needed. Welfare officers may ask to see
                your updated certificates and documents such as a more recent
                medical form or a letter from school which verifies the child is
                still in education.
              </p>
            </div>

            <div className="space-y-4 font-normal text-[20px] leading-[1.7]">
              <h2
                className="font-bold text-[40px] leading-[1.25]"
                id="get-help"
              >
                Get help with your application
              </h2>
              <p>
                If you want to apply but you cannot visit your local welfare
                office, and you cannot complete the form online either, contact:
              </p>
              <address className="mb-4 border-blue-10 border-l-2 pl-4 not-italic leading-[1.25]">
                <p>
                  Welfare Department
                  <br />
                  Weymouth Corporate Centre
                  <br />
                  Roebuck Street
                  <br />
                  Bridgetown
                  <br />
                  Saint Michael
                </p>
              </address>

              <p>+1 246-535-1000/16/23</p>
              <p>
                <Link
                  as={NextLink}
                  href="mailto:welfare.department@barbados.gov.bb"
                >
                  welfare.department@barbados.gov.bb
                </Link>
              </p>
            </div>
          </div>
          <div className="hidden lg:col-span-1 lg:block lg:pt-16">
            <nav className="sticky top-8">
              <h3 className="mb-4 font-bold text-[24px] leading-[1.25]">
                On this page
              </h3>
              <ul className="space-y-4 text-[20px] leading-[1.7]">
                <li>
                  <Link as={NextLink} href="#who-can-use-this-service">
                    Who can use this service
                  </Link>
                </li>
                <li>
                  <Link as={NextLink} href="#how-to-apply">
                    How to apply for financial assistance
                  </Link>
                </li>
                <li>
                  <Link as={NextLink} href="#no-address-or-bank-account">
                    No address and/or no bank account
                  </Link>
                </li>
                <li>
                  <Link as={NextLink} href="#reassessment-and-evaluation">
                    Reassessment and evaluation
                  </Link>
                </li>
                <li>
                  <Link as={NextLink} href="#get-help">
                    Get help with your application
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <HelpfulBox />
      </div>
    </>
  );
}
