import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="px-4 py-8 text-white">
      <div className="flex items-end justify-between">
        <p className="text-base">© 2025 Government of Barbados</p>
        <Image
          alt="flag"
          height="100"
          src="/images/coat-of-arms.png"
          width="100"
        />
      </div>
    </footer>
  );
};
