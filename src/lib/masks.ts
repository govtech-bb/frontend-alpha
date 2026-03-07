import type { MaskitoOptions } from "@maskito/core";

/** Maskito masks keyed by field mask type. */
export const masks = {
  /** Barbados National ID: xxxxxx-xxxx (6 digits, hyphen, 4 digits) */
  nid: {
    mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/],
  },
} as const satisfies Record<string, MaskitoOptions>;

export type MaskType = keyof typeof masks;
