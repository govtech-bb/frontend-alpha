export interface ReminderEvent {
  itemLabel: string;
  expiryISO: string;
  reminderDateISO: string;
  reminderOffset: number;
  id: string;
}

function eventTitle(reminder: ReminderEvent): string {
  return `Renew your ${reminder.itemLabel}`;
}

function buildEventDescription(reminder: ReminderEvent): string {
  const expiryLong = new Date(reminder.expiryISO).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return [
    `Your ${reminder.itemLabel} expires on ${expiryLong}.`,
    "",
    `This reminder lands ${reminder.reminderOffset} days before that date so you have time to renew.`,
  ].join("\n");
}

export function googleCalendarURL(reminder: ReminderEvent): string {
  const eventDate = new Date(reminder.reminderDateISO);
  const start = formatDateLocal(eventDate);
  const end = formatDateLocal(addDays(eventDate, 1));

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: eventTitle(reminder),
    dates: `${start}/${end}`,
    details: buildEventDescription(reminder),
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function outlookCalendarURL(reminder: ReminderEvent): string {
  // Outlook Live's all-day deeplink can treat enddt as inclusive, producing
  // a 2-day block. Schedule a short timed event at 09:00 local instead so
  // the reminder sits unambiguously on the chosen day.
  const eventDate = new Date(reminder.reminderDateISO);
  const start = new Date(eventDate);
  start.setHours(9, 0, 0, 0);
  const end = new Date(start);
  end.setMinutes(30);

  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: eventTitle(reminder),
    body: buildEventDescription(reminder),
    startdt: formatDateTimeLocal(start),
    enddt: formatDateTimeLocal(end),
  });

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

export function buildICS(reminder: ReminderEvent): string {
  const eventDate = new Date(reminder.reminderDateISO);
  const dtstart = formatDateLocal(eventDate);
  const dtend = formatDateLocal(addDays(eventDate, 1));
  const dtstamp = formatDateTimeUTC(new Date());

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Government of Barbados//Renew Reminder//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${reminder.id}@renew-reminder.alpha.gov.bb`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART;VALUE=DATE:${dtstart}`,
    `DTEND;VALUE=DATE:${dtend}`,
    `SUMMARY:${escapeText(eventTitle(reminder))}`,
    `DESCRIPTION:${escapeText(buildEventDescription(reminder))}`,
    "TRANSP:TRANSPARENT",
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ];
  return lines.join("\r\n");
}

export function downloadICS(reminder: ReminderEvent): void {
  const ics = buildICS(reminder);
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `renew-reminder-${reminder.id}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function generateReminderId(): string {
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  const block = () => {
    let s = "";
    for (let i = 0; i < 4; i += 1) {
      s += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return s;
  };
  return `REM-${block()}-${block()}`;
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

// All-day calendar events are date-only and have no time zone. We construct
// reminderDate from local Y/M/D, so we read it back with local getters too —
// using UTC getters here would shift the event by a day for anyone not at
// UTC+0 at midnight.
function formatDateLocal(d: Date): string {
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
}

// YYYY-MM-DDTHH:MM:SS — Outlook deeplink timed-event format (no timezone
// suffix; Outlook treats it as the user's local time).
function formatDateTimeLocal(d: Date): string {
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
    `T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  );
}

// DTSTAMP is a UTC timestamp of "when this iCalendar object was created" —
// that one is genuinely UTC per RFC 5545.
function formatDateTimeUTC(d: Date): string {
  return (
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}` +
    `T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`
  );
}

function addDays(d: Date, days: number): Date {
  const out = new Date(d);
  out.setDate(out.getDate() + days);
  return out;
}

function escapeText(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}
