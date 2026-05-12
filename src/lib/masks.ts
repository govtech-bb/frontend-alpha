import type { MaskitoOptions } from "@maskito/core";

/** Maskito masks keyed by field mask type. */
export const masks = {
  /** Barbados National ID: xxxxxx-xxxx (6 digits, hyphen, 4 digits) */
  nid: {
    mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/],
  },
  /** Currency amount with thousand separators and up to 2 decimals: 1,234.56 */
  money: {
    mask: /^[\d,]*\.?\d{0,2}$/,
    postprocessors: [
      ({ value, selection }) => {
        const cleaned = value.replace(/,/g, "");
        if (!cleaned) return { value: "", selection };
        const [whole, decimals] = cleaned.split(".");
        const withCommas = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const formatted =
          decimals !== undefined ? `${withCommas}.${decimals}` : withCommas;
        const diff = formatted.length - value.length;
        const [from, to] = selection;
        return {
          value: formatted,
          selection: [from + diff, to + diff],
        };
      },
    ],
  },
} as const satisfies Record<string, MaskitoOptions>;

/** Strip mask formatting (commas) to get a parseable number string. */
export function unmaskMoney(value: string): string {
  return value.replace(/,/g, "");
}

export type MaskType = keyof typeof masks;
