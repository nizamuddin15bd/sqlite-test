import { db } from "@/src/db/connection";

export const updateData = async ({
  table,
  data,
  whereColumn,
  whereValue,
}: {
  table: string;
  data: Record<string, any>;
  whereColumn: string;
  whereValue: any;
}): Promise<{ success: boolean; message: string }> => {
  try {
    const columns = Object.keys(data);
    const setClause = columns.map((col) => `${col} = ?`).join(", ");
    const values = columns.map((key) => data[key]);

    // Add the WHERE value to parameters
    const query = `UPDATE ${table} SET ${setClause} WHERE ${whereColumn} = ?`;

    await db.runAsync(query, [...values, whereValue]);

    return { success: true, message: `${table} record updated` };
  } catch (err) {
    console.error(`Update error in ${table}:`, err);
    return { success: false, message: "Update failed" };
  }
};
