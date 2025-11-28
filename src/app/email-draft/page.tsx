import { Link } from "@govtech-bb/react";
import NextLink from "next/link";

export default function Home() {
  return (
    <div className="container py-8">
      <div className="space-y-8">
        <h1 className="mb-8 font-bold text-[56px] leading-[1.15]">
          We have received your pre-registration form
        </h1>

        <div className="space-y-4 font-normal text-[20px] leading-[1.7]">
          <h2 className="font-bold text-[40px] leading-[1.25]">
            What to do next
          </h2>
          <p>
            To finish registering the birth, you must go to the Registration
            Department in the district where the child was born to:
          </p>
          <ol className="list-decimal space-y-2 pl-7">
            <li>Sign the birth register.</li>
            <li>
              Collect your certified copies of the child’s birth certificate if
              you have ordered any.
            </li>
          </ol>

          <p>Find out about:</p>

          <ul className="list-disc space-y-2 pl-7">
            <li>
              <Link as={NextLink} href="https://alpha.gov.bb/register-a-birth">
                where you need to go to complete the registration
              </Link>
            </li>
            <li>
              <Link as={NextLink} href="https://alpha.gov.bb/register-a-birth">
                late registration fees
              </Link>
            </li>
          </ul>
          <p>
            We will let you know when you can go to your local Registration
            Department
          </p>
        </div>

        <div className="space-y-4 font-normal text-[20px] leading-[1.7]">
          <h2 className="font-bold text-[40px] leading-[1.25]">
            Who should go to the registration
          </h2>
          <p>If you are:</p>

          <ul className="list-disc space-y-2 pl-7">
            <li>
              married to each other, the father must register and the mother can
              attend
            </li>
            <li>
              not married to each other, the mother must register the birth but
              it is not necessary for the father to attend
            </li>
            <li>
              not married to each other but the father wants to be named on the
              birth record, both parents must register the birth together
            </li>
          </ul>
          <p>You do not need to take the baby.</p>
        </div>

        <div className="space-y-4 font-normal text-[20px] leading-[1.7]">
          <h2 className="font-bold text-[40px] leading-[1.25]">
            What to bring
          </h2>
          <p>You need to show:</p>

          <ol className="list-decimal space-y-2 pl-7">
            <li>
              Your child’s Personal Child Health Record from the hospital or
              birthing centre (sometimes called the immunisation book or birth
              notification).
            </li>
            <li>
              A valid form of photo identification for each parent who will be
              named on the birth record.
            </li>
            <li>
              Your Barbados National ID card, valid passport or other
              government-issued ID if you are a Barbadian citizen. Non-Barbadian
              nationals must show their valid passport.
            </li>
            <li>
              Your original marriage certificate if you are married to the
              child’s other parent.
            </li>
          </ol>
        </div>

        <div className="space-y-4 font-normal text-[20px] leading-[1.7]">
          <h3 className="font-bold text-[24px] leading-[1.25]">
            Parents who are minors
          </h3>
          <p>
            If you are a mother or a father and you are under 16 years old, you
            are considered a minor. You must be accompanied by your parent(s) or
            guardian(s).
          </p>

          <p>If you have a valid passport, you must bring:</p>

          <ul className="list-disc space-y-2 pl-7">
            <li>your valid passport</li>
            <li>your original birth certificate</li>
            <li>the child’s medical book (green book)</li>
          </ul>

          <p>If you do not have a valid passport, you must bring:</p>

          <ul className="list-disc space-y-2 pl-7">
            <li>your minor’s identification card</li>
            <li>your original birth certificate</li>
            <li>the child’s medical book (green book)</li>
            <li>an identification letter signed by a Justice of the Peace</li>
          </ul>
        </div>

        <div className="space-y-4 font-normal text-[20px] leading-[1.7]">
          <h2 className="font-bold text-[40px] leading-[1.25]">
            If you need support
          </h2>
          <p>
            If you need help registering a birth, for example, you are unable to
            sign the register in person, contact the Registration Department in
            Bridgetown as soon as possible after the child is born.
          </p>

          <p>
            Registration Department
            <br />
            Supreme Court Complex
            <br />
            Whitepark Road
            <br />
            St. Michael
          </p>

          <p>(246) 535-9700</p>
        </div>
      </div>
    </div>
  );
}
