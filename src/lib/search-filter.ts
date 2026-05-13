export type Searchable = {
  name: string;
  shortDescription?: string;
};

export function filterByQuery<T extends Searchable>(
  items: T[],
  query: string
): T[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return items;

  return items.filter(
    (item) =>
      item.name.toLowerCase().includes(trimmed) ||
      (item.shortDescription?.toLowerCase().includes(trimmed) ?? false)
  );
}
