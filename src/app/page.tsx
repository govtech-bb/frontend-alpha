import Link from "next/link";
import { Typography } from "@/components/ui/typography";

const EXISTING_SERVICES = [
  {
    title: "Register a marriage",
    link: "https://www.gov.bb/register-marriage",
  },
  {
    title: "Register a death",
    link: "https://www.gov.bb/register-death",
  },
  {
    title: "Get a drivers license",
    link: "https://www.gov.bb/Citizens/driver-licence",
  },
  {
    title: "Apply for a passport",
    link: "https://www.gov.bb/apply-passport",
  },
  {
    title: "Set up a business",
    link: "https://www.gov.bb/start-business",
  },
  {
    title: "Get a marriage license",
    link: "https://www.gov.bb/marriage-licence",
  },
];

const INFORMATION_SECTIONS = [
  {
    title: "Paying corporation tax",
    link: "https://www.gov.bb/tax-information",
    description:
      "Find out how company tax is worked out, including what income is taxed and the rates that apply",
  },
  {
    title: "Finding a job",
    link: "https://www.gov.bb/job-seekers",
    description:
      "Get help with applying for jobs, preparing for interviews, and exploring public and overseas opportunities",
  },
];

export default function Home() {
  return (
    <>
      <section
        className="space-y-8 border-[#E5BD39] border-b-4 bg-[#FFC726] px-4 py-8"
        id="introduction"
      >
        <Typography variant="display">
          Government Alpha Services v1.0
        </Typography>
        <div className="space-y-4">
          <Typography variant="subheading">
            It will be clearer, simpler and faster for citizens to get things
            done.
          </Typography>
        </div>
      </section>
      <section
        className="space-y-6 border-[#30C0C8] border-b-4 bg-[#DEF5F6] px-4 py-8"
        id="alpha_services"
      >
        <Typography variant="h2">Alpha services</Typography>

        <Typography variant="paragraph">
          Alpha services are new and are very likely to change.
        </Typography>

        <div className="flex flex-col gap-2">
          <Link
            className="cursor-pointer font-normal text-[20px] leading-[150%] underline"
            href="/loud-music-permit"
          >
            Get a permit to play loud music
          </Link>
          <Link
            className="cursor-pointer font-normal text-[20px] leading-[150%] underline"
            href="/register-summer-camp"
          >
            Register for a summer camp
          </Link>
        </div>
      </section>
      <section
        className="space-y-6 border-[#1FBF84] border-b-4 bg-[#A8E6CF] px-4 py-8"
        id="existing_services"
      >
        <Typography variant="h2">Existing services</Typography>

        <Typography variant="paragraph">
          Existing services are live on gov.bb.
          <br />
          They will open in a new window.
        </Typography>

        <div className="flex flex-col gap-2">
          {EXISTING_SERVICES.map((service) => (
            <Link
              className="cursor-pointer font-normal text-[20px] leading-[150%] underline"
              href={service.link}
              key={service.title}
              rel="noopener noreferrer"
              target="_blank"
            >
              {service.title}
            </Link>
          ))}
        </div>
      </section>
      <section
        className="space-y-6 border-[#E0E4E9] border-b-4 bg-white px-4 py-8"
        id="useful_information"
      >
        <Typography variant="h2">Useful information</Typography>

        <div className="flex flex-col gap-2 space-y-4">
          {INFORMATION_SECTIONS.map((information) => (
            <div key={information.title}>
              <Link
                className="text-[#1E787D] text-[20px] underline underline-offset-2"
                href={information.link}
                rel="noopener noreferrer"
                target="_blank"
              >
                {information.title}
              </Link>
              <Typography variant="paragraph">
                {information.description}
              </Typography>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
