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
                Register a birth
              </h1>
              <StageBanner stage="alpha" />
              <div className="border-neutral-grey/50 border-b-4 pb-3 text-[16px] text-neutral-midgrey leading-normal">
                Last updated on 17 October 2025
              </div>
            </div>
            <div className="flex flex-col gap-4 font-normal text-[20px] leading-[1.7]">
              <p>
                It is a legal requirement that all births in Barbados (including
                stillbirths) are registered within 28 days.
              </p>
              <p>
                When a child's birth has been registered, a birth certificate
                can be issued. The certificate is essential for access to
                citizenship rights including legal identity documents, certain
                health services and school enrollment.
              </p>
            </div>
            <div className="space-y-4">
              <h2
                className="font-bold text-[40px] leading-[1.25]"
                id="who-should-attend"
              >
                Who should attend the registration of a birth?
              </h2>
              <p className="text-[20px]">
                You cannot register a birth online yet, so you need to do it in
                person in the district where the child was born.
              </p>
              <p className="text-[20px]">If the parents are:</p>
              <ul className="list-disc pl-7 text-[20px]">
                <li>
                  not married to each other, only the mother can go to register
                  the birth
                </li>
                <li>married to each other, the father can go too</li>
                <li>
                  not married to each other but the father wants his name on the
                  birth record, both parents must attend together
                </li>
              </ul>
            </div>

            <div className="space-y-4 font-normal text-[20px] leading-[1.7]">
              <h2
                className="font-bold text-[40px] leading-[1.25]"
                id="late-registrations"
              >
                Late registrations
              </h2>
              <p>
                Births must be registered within 28 days of the child being
                born. The process to register a birth after this time is the
                same but you will be charged BDS $20.00.
              </p>
            </div>

            <div className="space-y-4 font-normal text-[20px] leading-[1.7]">
              <h2
                className="font-bold text-[40px] leading-[1.25]"
                id="what-to-bring"
              >
                What to bring
              </h2>
              <ol className="list-decimal space-y-4 pl-7">
                <li>
                  not married to each other, only the mother can go to register
                  the birth
                </li>
                <li>married to each other, the father can go too</li>
                <li>
                  not married to each other but the father wants his name on the
                  birth record, both parents must attend together
                </li>
              </ol>
            </div>

            <div className="space-y-4 font-normal text-[20px] leading-[1.7]">
              <h2
                className="font-bold text-[40px] leading-[1.25]"
                id="parents-who-are-minors"
              >
                Parents who are minors
              </h2>
              <p>
                If you are a mother or a father and you are 18 years old or
                younger, you must bring:
              </p>
              <p>Your own birth certificate or passport.</p>
              <p>Your National ID card.</p>
              <p>
                A passport-sized photograph of yourself that has been certified
                by a Justice of the Peace.
              </p>
            </div>

            <div className="space-y-4 font-normal text-[20px] leading-[1.7]">
              <h2
                className="font-bold text-[40px] leading-[1.25]"
                id="how-to-register"
              >
                How to register a birth
              </h2>
              <ol className="list-decimal space-y-4 pl-7">
                <li>
                  not married to each other, only the mother can go to register
                  the birth
                </li>
                <li>married to each other, the father can go too</li>
                <li>
                  not married to each other but the father wants his name on the
                  birth record, both parents must attend together
                </li>
              </ol>
            </div>

            <div className="font-normal text-[20px] leading-[1.7]">
              <h2
                className="mb-4 font-bold text-[40px] leading-[1.25]"
                id="where-to-register"
              >
                Where to register
              </h2>
              <div className="space-y-8 font-normal text-[20px] leading-[1.7]">
                <p>
                  You cannot register a birth online yet, so you need to do it
                  in person in the district where the child was born. If you are
                  not sure which district your child was born in, contact the
                  Registration Department in the Supreme Court Complex on (246)
                  434-9970
                </p>
                <div className="space-y-2">
                  <h3 className="font-bold text-[24px] leading-[1.25]">
                    Born in St. Michael (Bridgetown)
                  </h3>

                  <p className="text-[20px] leading-[1.7]">
                    Go to the Registration Department (Records Branch), in the
                    Supreme Court Complex, Whitepark Road, St. Michael
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-[24px] leading-[1.25]">
                    Born in Christ Church or St. George
                  </h3>
                  <p className="text-[20px] leading-[1.7]">
                    Go to the District B Magistrate's Court, Workmans, Saint
                    George
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-[24px] leading-[1.25]">
                    Born in St. Philip or St. John
                  </h3>

                  <p className="text-[20px] leading-[1.7]">
                    Go to the District C Magistrate's Court
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-[24px] leading-[1.25]">
                    Born in St. Thomas
                  </h3>

                  <p className="text-[20px] leading-[1.7]">
                    Go to the District D Magistrate's Court, Bridgefield, Saint
                    Thomas
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-[24px] leading-[1.25]">
                    Born in St. Peter, St. James, or St. Lucy
                  </h3>
                  <p className="text-[20px] leading-[1.7]">
                    Go to the District E Magistrate's Court
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-[24px] leading-[1.25]">
                    Born in St. Joseph or St. Andrew
                  </h3>
                  <p className="text-[20px] leading-[1.7]">
                    Go to the District F Magistrate's Court, Bowling Alley Hill,
                    Saint Joseph
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:col-span-1 lg:block lg:pt-16">
            <nav className="sticky top-8">
              <h3 className="mb-4 font-bold text-[24px] leading-[1.25]">
                On this page
              </h3>
              <ul className="space-y-4 text-[20px] leading-[1.7]">
                <li>
                  <Link as={NextLink} href="#who-should-attend">
                    Who should attend the registration of a birth?
                  </Link>
                </li>
                <li>
                  <Link as={NextLink} href="#late-registrations">
                    Late registrations
                  </Link>
                </li>
                <li>
                  <Link as={NextLink} href="#what-to-bring">
                    What to bring
                  </Link>
                </li>
                <li>
                  <Link as={NextLink} href="#parents-who-are-minors">
                    Parents who are minors
                  </Link>
                </li>
                <li>
                  <Link as={NextLink} href="#how-to-register">
                    How to register a birth
                  </Link>
                </li>
                <li>
                  <Link as={NextLink} href="#where-to-register">
                    Where to register
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
