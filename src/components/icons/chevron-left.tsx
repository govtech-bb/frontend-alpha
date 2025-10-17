import type React from "react";

type ChevronLeftSVGProps = {
  className?: string;
};

export const ChevronLeftSVG: React.FC<ChevronLeftSVGProps> = ({
  className = "",
}) => (
  <svg
    className={className}
    fill="none"
    height="8"
    viewBox="0 0 11 8"
    width="11"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Chevron Left</title>
    <path
      d="M6.42116 5C6.50226 5.90417 6.70318 6.82308 6.9988 8C4.80744 5.55882 3.49691e-07 4 3.49691e-07 4C3.49691e-07 4 4.31088 2.76471 7 1.27146e-07C6.70717 1.20568 6.52523 2.15831 6.43953 3L11 3L11 5L6.42116 5Z"
      fill="currentColor"
    />
  </svg>
);
