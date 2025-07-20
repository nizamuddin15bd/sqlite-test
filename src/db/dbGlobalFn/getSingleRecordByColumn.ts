// getSingleRecordByColumn.ts
import { db } from "../connection";

export const getSingleRecordByColumn = async <T>(
  table: string,
  column: string,
  value: string | number
): Promise<T | null> => {
  try {
    const query = `SELECT * FROM ${table} WHERE LOWER(${column}) = LOWER(?) LIMIT 1`;
    const result = await db.getFirstAsync(query, [value.toString().trim()]);
    return result as T | null;
  } catch (error) {
    console.error("Error getting record:", error);
    return null;
  }
};
