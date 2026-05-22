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
  const start = formatDateUTC(eventDate);
  const end = formatDateUTC(addDays(eventDate, 1));

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: eventTitle(reminder),
    dates: `${start}/${end}`,
    details: buildEventDescription(reminder),
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function outlookCalendarURL(reminder: ReminderEvent): string {
  const eventDate = new Date(reminder.reminderDateISO);
  const startdt = formatDateOnly(eventDate);
  const enddt = formatDateOnly(addDays(eventDate, 1));

  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: eventTitle(reminder),
    body: buildEventDescription(reminder),
    startdt,
    enddt,
    allday: "true",
  });

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

export function buildICS(reminder: ReminderEvent): string {
  const eventDate = new Date(reminder.reminderDateISO);
  const dtstart = formatDateUTC(eventDate);
  const dtend = formatDateUTC(addDays(eventDate, 1));
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

function formatDateUTC(d: Date): string {
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}`;
}

function formatDateOnly(d: Date): string {
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
}

function formatDateTimeUTC(d: Date): string {
  return (
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}` +
    `T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`
  );
}

function addDays(d: Date, days: number): Date {
  const out = new Date(d);
  out.setUTCDate(out.getUTCDate() + days);
  return out;
}

function escapeText(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}
