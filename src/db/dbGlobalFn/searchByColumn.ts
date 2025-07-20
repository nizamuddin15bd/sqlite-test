// src/db/helpers/searchByColumn.ts
import { db } from "@/src/db/connection";

export const searchByColumn = async <T>(
  table: string,
  column: string,
  query: string,
  matchAnywhere: boolean = true
): Promise<T[]> => {
  try {
    const trimmedQuery = query.trim().toLowerCase();
    const wildcardQuery = matchAnywhere
      ? `%${trimmedQuery}%`
      : `${trimmedQuery}%`;

    const sql = `SELECT * FROM ${table} WHERE LOWER(${column}) LIKE ?`;
    return await db.getAllAsync<T>(sql, [wildcardQuery]);
  } catch (error) {
    console.error(`Error searching in ${table}:`, error);
    return [];
  }
};
