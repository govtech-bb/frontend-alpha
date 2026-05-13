import { Link } from "@govtech-bb/react";

export interface ContactTableRow {
  section: string;
  phone: string;
}

export interface ContactTableProps {
  title: string;
  rows: ContactTableRow[];
  address?: string[];
}

export function ContactTable({ title, rows, address }: ContactTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th
              className="bg-teal-00 px-4 py-3 text-left font-bold text-base text-white-00"
              colSpan={2}
            >
              {title}
            </th>
          </tr>
          <tr className="bg-blue-10">
            <th className="border-grey-00 border-b px-4 py-2 text-left font-bold text-black-00">
              Section / Office
            </th>
            <th className="whitespace-nowrap border-grey-00 border-b px-4 py-2 text-left font-bold text-black-00">
              Tel Number
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              className={index % 2 === 0 ? "bg-white-00" : "bg-blue-10"}
              key={row.section}
            >
              <td className="border-grey-00 border-b px-4 py-2 text-black-00">
                {row.section}
              </td>
              <td className="whitespace-nowrap border-grey-00 border-b px-4 py-2">
                <Link href={`tel:${row.phone.replace(/[^\d+]/g, "")}`}>
                  {row.phone}
                </Link>
              </td>
            </tr>
          ))}
          {address && address.length > 0 && (
            <tr>
              <td
                className="px-4 py-3 align-top text-black-00 text-sm leading-relaxed"
                colSpan={2}
              >
                {address.map((line) => (
                  <span className="block" key={line}>
                    {line}
                  </span>
                ))}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
