"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";

const ITEMS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/government/organisations", label: "Organisations" },
];

function HamburgerIcon() {
  return (
    <span aria-hidden="true" className="relative block h-4 w-6">
      <span className="absolute top-0 left-0 h-0.5 w-6 bg-current" />
      <span className="absolute top-1/2 left-0 h-0.5 w-6 -translate-y-1/2 bg-current" />
      <span className="absolute bottom-0 left-0 h-0.5 w-6 bg-current" />
    </span>
  );
}

function CloseIcon() {
  return (
    <span aria-hidden="true" className="relative block h-5 w-5">
      <span className="absolute top-1/2 left-0 h-0.5 w-5 -translate-y-1/2 rotate-45 bg-current" />
      <span className="absolute top-1/2 left-0 h-0.5 w-5 -translate-y-1/2 -rotate-45 bg-current" />
    </span>
  );
}

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <nav aria-label="Primary" className="ml-auto sm:contents">
      <button
        aria-controls={id}
        aria-expanded={open}
        aria-label="Open menu"
        className="-mr-2 flex h-10 w-10 items-center justify-center sm:hidden"
        onClick={() => setOpen(true)}
        type="button"
      >
        <HamburgerIcon />
      </button>

      {open && (
        <div
          aria-modal="true"
          className="fixed inset-0 z-50 flex flex-col bg-white-00 sm:hidden"
          id={id}
          role="dialog"
        >
          <div className="bg-yellow-100">
            <div className="container">
              <div className="flex items-center py-s">
                <span className="font-bold text-[20px]">Menu</span>
                <button
                  aria-label="Close menu"
                  className="-mr-2 ml-auto flex h-10 w-10 items-center justify-center"
                  onClick={() => setOpen(false)}
                  type="button"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>
          </div>
          <ul className="flex flex-col">
            {ITEMS.map((item) => (
              <li className="border-grey-00 border-b" key={item.href}>
                <div className="container">
                  <Link
                    className="block py-4 font-medium text-[20px] hover:underline"
                    href={item.href}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ul className="hidden sm:ml-auto sm:flex sm:items-center sm:gap-s">
        {ITEMS.map((item) => (
          <li key={item.href}>
            <Link className="font-medium hover:underline" href={item.href}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
