import { cn } from "@/lib/utils";

export function TridentAvatar({
  size = "sm",
  className,
}: {
  size?: "sm" | "lg";
  className?: string;
}) {
  const dims = size === "lg" ? "h-24 w-24" : "h-8 w-8";
  const tridentSize = size === "lg" ? "w-9" : "w-4";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-full",
        "bg-[radial-gradient(circle_at_50%_40%,var(--color-yellow-10),var(--color-yellow-40))]",
        "shadow-[0_0_0_1px_var(--color-yellow-100),0_8px_24px_-10px_var(--color-yellow-00)]",
        size === "lg" &&
          "motion-safe:animate-[bot-hum_3s_ease-in-out_infinite]",
        dims,
        className
      )}
    >
      {size === "lg" && (
        <>
          <span className="pointer-events-none absolute inset-0 rounded-full border-2 border-[var(--color-yellow-100)] opacity-0 motion-safe:animate-[bot-pulse_2.6s_ease-out_infinite]" />
          <span className="pointer-events-none absolute inset-0 rounded-full border-2 border-[var(--color-yellow-100)] opacity-0 [animation-delay:1.3s] motion-safe:animate-[bot-pulse_2.6s_ease-out_infinite]" />
        </>
      )}
      <svg
        className={cn("relative z-[1] fill-blue-100", tridentSize)}
        viewBox="0 0 26 27"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12.5786 0C11.6253 2.46943 10.6536 5.03986 8.57466 7.00774C9.21998 6.80573 10.3493 6.62461 11.0753 6.64203V17.0283L7.988 17.4636C7.878 17.4532 7.84133 17.2895 7.84133 17.0666C7.54434 13.8413 6.74135 11.1316 5.81736 8.32779C5.75136 7.94466 4.58171 6.48181 5.4837 6.73955C5.5937 6.75348 6.80002 7.2202 6.60935 6.99729C4.96671 5.38119 2.56508 4.21788 0.233112 3.87306C0.0277812 3.8243 -0.0932171 3.92183 0.0901136 4.14822C3.18474 8.6726 5.77336 14.012 5.75136 20.3475C6.95401 20.3475 9.86897 19.6718 11.0753 19.6718V27H12.5969L12.9453 6.53406L12.5786 0Z" />
        <path d="M12.5786 0C13.5319 2.46943 14.5036 5.03986 16.5825 7.00774C15.9372 6.80573 14.8079 6.62461 14.0819 6.64203V17.0283L17.1692 17.4636C17.2792 17.4532 17.3159 17.2895 17.3159 17.0666C17.6129 13.8413 18.4158 11.1316 19.3398 8.32779C19.4058 7.94466 20.5755 6.48181 19.6735 6.73955C19.5635 6.75348 18.3572 7.2202 18.5478 6.99729C20.1905 5.38119 22.5921 4.21788 24.9241 3.87306C25.1294 3.8243 25.2504 3.92183 25.0671 4.14822C21.9725 8.6726 19.3838 14.012 19.4058 20.3475C18.2032 20.3475 15.2882 19.6718 14.0819 19.6718V27H12.5603L12.2119 6.53406L12.5786 0Z" />
      </svg>
    </div>
  );
}
