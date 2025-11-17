import type { DateInputValue } from "@govtech-bb/react";
import { z } from "zod";

const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

const formatDate = (date: Date): string => {
  const day = date.getDate();
  const month = date.toLocaleString("en-GB", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const stripTime = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

// https://design-system.service.gov.uk/components/date-input/
// Vlaidation rules for date input
export const createDateSchema = (label = "Date") => {
  return z
    .preprocess(
      (val) => {
        // Convert undefined to empty object
        if (val === undefined || val === null) {
          return { day: "", month: "", year: "" };
        }
        return val;
      },
      z
        .object({
          day: z.string(),
          month: z.string(),
          year: z.string(),
        })
        // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
        .superRefine((value, ctx) => {
        const { day, month, year } = value;

        // Check if empty
        const isEmpty = !(day || month || year);
        if (isEmpty) {
          return;
        }

        // Track missing/invalid parts
        const missingParts: string[] = [];
        const invalidParts: Array<{ field: string; message: string }> = [];

        // Validate day
        if (!day) {
          missingParts.push("day");
        } else if (!/^\d+$/.test(day)) {
          invalidParts.push({ field: "day", message: "Day must be a number" });
        }

        // Validate month
        if (!month) {
          missingParts.push("month");
        } else if (!/^\d+$/.test(month)) {
          invalidParts.push({
            field: "month",
            message: "Month must be a number",
          });
        }

        // Validate year
        if (!year) {
          missingParts.push("year");
        } else if (year.length !== 4 || !/^\d{4}$/.test(year)) {
          invalidParts.push({
            field: "year",
            message: "Year must include 4 numbers",
          });
        }

        // Handle missing parts
        if (missingParts.length > 0) {
          let message: string;
          if (missingParts.length === 1) {
            message = `${capitalize(label)} must include a ${missingParts[0]}`;
          } else if (missingParts.length === 2) {
            message = `${capitalize(label)} must include a ${missingParts[0]} and ${missingParts[1]}`;
          } else {
            message = `Enter ${label}`;
          }

          for (const part of missingParts) {
            ctx.addIssue({
              code: "custom",
              path: [part],
              message,
            });
          }
          return;
        }

        // Handle invalid formats
        if (invalidParts.length > 0) {
          for (const { field, message } of invalidParts) {
            ctx.addIssue({
              code: "custom",
              path: [field],
              message,
            });
          }
          return;
        }

        // Validate numeric ranges
        const dayNum = Number.parseInt(day, 10);
        const monthNum = Number.parseInt(month, 10);
        const yearNum = Number.parseInt(year, 10);

        if (dayNum < 1 || dayNum > 31) {
          ctx.addIssue({
            code: "custom",
            path: ["day"],
            message: "Day must be between 1 and 31",
          });
        }

        if (monthNum < 1 || monthNum > 12) {
          ctx.addIssue({
            code: "custom",
            path: ["month"],
            message: "Month must be between 1 and 12",
          });
        }

        if (ctx.issues.length > 0) return;

        // Validate real date
        const date = new Date(yearNum, monthNum - 1, dayNum);
        const isValidDate =
          date.getDate() === dayNum &&
          date.getMonth() === monthNum - 1 &&
          date.getFullYear() === yearNum;

        if (!isValidDate) {
          ctx.addIssue({
            code: "custom",
            message: `${capitalize(label)} must be a real date`,
          });
        }
      })
    );
};

export const dateValidation = {
  required: (schema: ReturnType<typeof createDateSchema>, label: string) =>
    schema.refine((value) => !!(value.day || value.month || value.year), {
      message: `Enter ${label}`,
    }),

  past: (schema: ReturnType<typeof createDateSchema>, label: string) =>
    schema.refine(
      (value) => {
        const date = parseAndStrip(value);
        return date && date < stripTime(new Date());
      },
      { message: `${capitalize(label)} must be in the past` }
    ),

  pastOrToday: (schema: ReturnType<typeof createDateSchema>, label: string) =>
    schema.refine(
      (value) => {
        const date = parseAndStrip(value);
        return date && date <= stripTime(new Date());
      },
      { message: `${capitalize(label)} must be today or in the past` }
    ),

  future: (schema: ReturnType<typeof createDateSchema>, label: string) =>
    schema.refine(
      (value) => {
        const date = parseAndStrip(value);
        return date && date > stripTime(new Date());
      },
      { message: `${capitalize(label)} must be in the future` }
    ),

  futureOrToday: (schema: ReturnType<typeof createDateSchema>, label: string) =>
    schema.refine(
      (value) => {
        const date = parseAndStrip(value);
        return date && date >= stripTime(new Date());
      },
      { message: `${capitalize(label)} must be today or in the future` }
    ),

  after: (
    schema: ReturnType<typeof createDateSchema>,
    compareDate: Date,
    label: string,
    description?: string
  ) =>
    schema.refine(
      (value) => {
        const date = parseAndStrip(value);
        return date && date > stripTime(compareDate);
      },
      {
        message: `${capitalize(label)} must be after ${formatDate(compareDate)}${
          description ? ` ${description}` : ""
        }`,
      }
    ),

  onOrAfter: (
    schema: ReturnType<typeof createDateSchema>,
    compareDate: Date,
    label: string,
    description?: string
  ) =>
    schema.refine(
      (value) => {
        const date = parseAndStrip(value);
        return date && date >= stripTime(compareDate);
      },
      {
        message: `${capitalize(label)} must be the same as or after ${formatDate(compareDate)}${
          description ? ` ${description}` : ""
        }`,
      }
    ),

  before: (
    schema: ReturnType<typeof createDateSchema>,
    compareDate: Date,
    label: string,
    description?: string
  ) =>
    schema.refine(
      (value) => {
        const date = parseAndStrip(value);
        return date && date < stripTime(compareDate);
      },
      {
        message: `${capitalize(label)} must be before ${formatDate(compareDate)}${
          description ? ` ${description}` : ""
        }`,
      }
    ),

  onOrBefore: (
    schema: ReturnType<typeof createDateSchema>,
    compareDate: Date,
    label: string,
    description?: string
  ) =>
    schema.refine(
      (value) => {
        const date = parseAndStrip(value);
        return date && date <= stripTime(compareDate);
      },
      {
        message: `${capitalize(label)} must be the same as or before ${formatDate(compareDate)}${
          description ? ` ${description}` : ""
        }`,
      }
    ),

  between: (
    schema: ReturnType<typeof createDateSchema>,
    range: { start: Date; end: Date },
    label: string,
    description?: string
  ) =>
    schema.refine(
      (value) => {
        const date = parseAndStrip(value);
        return (
          date && date >= stripTime(range.start) && date <= stripTime(range.end)
        );
      },
      {
        message: `${capitalize(label)} must be between ${formatDate(range.start)} and ${formatDate(range.end)}${
          description ? ` ${description}` : ""
        }`,
      }
    ),

  minYear: (
    schema: ReturnType<typeof createDateSchema>,
    year: number,
    _label: string
  ) =>
    schema.refine(
      (value) => {
        const yearNum = Number.parseInt(value.year, 10);
        return !Number.isNaN(yearNum) && yearNum >= year;
      },
      {
        message: `Year must be ${year} or later`,
        path: ["year"],
      }
    ),
};

// ? should I move this as a utility in design system, to formate and deformat date?
const parseAndStrip = (value: DateInputValue): Date | null => {
  const day = Number.parseInt(value.day, 10);
  const month = Number.parseInt(value.month, 10);
  const year = Number.parseInt(value.year, 10);

  if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year)) {
    return null;
  }

  return stripTime(new Date(year, month - 1, day));
};
