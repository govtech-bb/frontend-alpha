import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-[#00267F] px-4 py-8 text-white">
      <div className="space-y-4">
        <h4 className="font-bold text-2xl">How services are changing</h4>

        <div className="flex flex-col gap-4">
          <Link
            className="cursor-pointer font-normal text-[20px] leading-[150%] underline transition-colors duration-300 hover:no-underline"
            href="#"
          >
            Why these changes are happening
          </Link>
          <Link
            className="cursor-pointer font-normal text-[20px] leading-[150%] underline transition-colors duration-300 hover:no-underline"
            href="#"
          >
            How we choose what to work on first
          </Link>
          <Link
            className="cursor-pointer font-normal text-[20px] leading-[150%] underline transition-colors duration-300 hover:no-underline"
            href="#"
          >
            Digital roadmap
          </Link>
        </div>

        <div className="mt-6 pt-4">
          <p className="text-[20px]">© 2025 Government of Barbados</p>
        </div>
      </div>
    </footer>
  );
};
