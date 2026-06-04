/**
 * Small inline icons for the emergency shelter finder.
 */

export function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={`size-6 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      focusable="false"
      viewBox="0 0 24 24"
    >
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5 shrink-0"
      fill="none"
      focusable="false"
      viewBox="0 0 24 24"
    >
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function LocationIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      focusable="false"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 2v3M12 19v3M2 12h3M19 12h3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <circle
        cx="12"
        cy="12"
        fill="none"
        r="5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" fill="currentColor" r="1.5" />
    </svg>
  );
}

/** Hollow teardrop pin with a ring hole — scales with surrounding text. */
export function MapPinIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4 shrink-0"
      fill="none"
      focusable="false"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 21s7-7.25 7-12a7 7 0 1 0-14 0c0 4.75 7 12 7 12z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <circle
        cx="12"
        cy="9"
        fill="none"
        r="2.5"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
