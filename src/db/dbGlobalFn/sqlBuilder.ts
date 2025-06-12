export const buildSqlFilters = ({
  searchQuery = "",
  sortByOrder = "desc",
  limit = 10,
  offset = 0,
  searchFields = ["name"], // default is ["name"], now supports multiple fields
}: {
  searchQuery?: string;
  sortByOrder?: "asc" | "desc";
  limit?: number;
  offset?: number;
  searchFields?: string[];
}) => {
  const hasSearch = searchQuery.trim().length > 0;
  const params: any[] = [];

  // Build WHERE clause using OR across all search fields
  const whereClause = hasSearch
    ? `WHERE ${searchFields.map((field) => `${field} LIKE ?`).join(" OR ")}`
    : "";

  if (hasSearch) {
    searchFields.forEach(() => {
      params.push(`%${searchQuery.trim()}%`);
    });
  }

  const orderClause = `ORDER BY id ${sortByOrder.toUpperCase()}`;
  const paginationClause = `LIMIT ? OFFSET ?`;

  params.push(limit, offset);

  const fullClause = `${whereClause} ${orderClause} ${paginationClause}`;

  return { fullClause, params };
};
