import type {
  HTMLAttributes,
  ReactNode,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";

type TableProps = HTMLAttributes<HTMLTableElement> & {
  caption?: ReactNode;
};

export const Table = ({
  caption,
  children,
  className,
  ...props
}: TableProps) => (
  <div className="my-s overflow-x-auto">
    <div className="inline-block min-w-full align-middle">
      <table className={`min-w-full ${className ?? ""}`.trim()} {...props}>
        {caption && (
          <caption className="px-xs py-xs text-left text-caption text-mid-grey-00">
            {caption}
          </caption>
        )}
        {children}
      </table>
    </div>
  </div>
);

export const TableHead = (props: HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className="bg-blue-10" {...props} />
);

export const TableBody = (props: HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className="bg-white" {...props} />
);

export const TableRow = (props: HTMLAttributes<HTMLTableRowElement>) => (
  <tr className="border-blue-10 border-b last:border-b-0" {...props} />
);

export const TableHeader = ({
  className,
  ...props
}: ThHTMLAttributes<HTMLTableCellElement>) => (
  <th
    className={`px-xs py-s text-left font-bold text-caption text-mid-grey-00 ${className ?? ""}`.trim()}
    scope="col"
    {...props}
  />
);

export const TableCell = ({
  className,
  ...props
}: TdHTMLAttributes<HTMLTableCellElement>) => (
  <td
    className={`px-xs py-s text-black text-caption ${className ?? ""}`.trim()}
    {...props}
  />
);
